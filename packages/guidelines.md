# 指南

以下是 VueUse 函数的指南。你也可以将其作为编写自己的可组合函数或应用程序的参考。

你还可以在 [Anthony Fu](https://github.com/antfu) 关于 VueUse 的演讲中了解这些设计决策的原因以及编写可组合函数的一些技巧：

- [Composable Vue](https://antfu.me/posts/composable-vue-vueday-2021) - VueDay 2021 演讲
- [可组合的 Vue](https://antfu.me/posts/composable-vue-vueconf-china-2021) - VueConf China 2021 演讲（中文）

## 通用原则

- 从 `"vue"` 导入所有 Vue API
- 尽可能使用 `ref` 而不是 `reactive`
- 尽可能使用选项对象作为参数，以便于未来扩展
- 在包装大量数据时使用 `shallowRef` 而不是 `ref`
- 使用 `configurableWindow`（等）来处理全局变量（如 `window`），以便于多窗口、测试模拟和 SSR 场景
- 当涉及到浏览器尚未广泛实现的 Web API 时，同时输出 `isSupported` 标志
- 在内部使用 `watch` 或 `watchEffect` 时，尽可能使 `immediate` 和 `flush` 选项可配置
- 使用 `tryOnUnmounted` 优雅地清理副作用
- 避免使用控制台日志
- 当函数是异步的时候，返回一个 PromiseLike

另请参阅：[最佳实践](./guide/best-practice.md)

## ShallowRef

在包装大量数据时使用 `shallowRef` 而不是 `ref`。

```ts
export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  // 使用 `shallowRef` 来避免深层响应性
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()

  fetch(toValue(url))
    .then(r => r.json())
    .then(r => data.value = r)
    .catch(e => error.value = e)

  /* ... */
}
```

## 可配置的全局变量

当使用全局变量如 `window` 或 `document` 时，在选项接口中支持 `configurableWindow` 或 `configurableDocument`，以便于多窗口、测试模拟和 SSR 等场景。

了解更多实现细节：[`_configurable.ts`](https://github.com/vueuse/vueuse/blob/main/packages/core/_configurable.ts)

```ts
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export function useActiveElement<T extends HTMLElement>(
  options: ConfigurableWindow = {},
) {
  const {
    // defaultWindow = isClient ? window : undefined
    window = defaultWindow,
  } = options

  let el: T

  // 在 Node.js 环境（SSR）中跳过
  if (window) {
    window.addEventListener('blur', () => {
      el = window?.document.activeElement
    }, true)
  }

  /* ... */
}
```

使用示例：

```ts
// 在 iframe 中绑定到父窗口
useActiveElement({ window: window.parent })
```

## Watch 选项

在内部使用 `watch` 或 `watchEffect` 时，尽可能使 `immediate` 和 `flush` 选项可配置。例如 `watchDebounced`：

```ts
import type { WatchOptions } from 'vue'

// 扩展 watch 选项
export interface WatchDebouncedOptions extends WatchOptions {
  debounce?: number
}

export function watchDebounced(
  source: any,
  cb: any,
  options: WatchDebouncedOptions = {},
): WatchStopHandle {
  return watch(
    source,
    () => { /* ... */ },
    options, // 传递 watch 选项
  )
}
```

## 控制选项

我们使用 `controls` 选项允许用户在简单用例中使用单一返回值的函数，同时在需要时能够获得更多控制和灵活性。详见：[#362](https://github.com/vueuse/vueuse/pull/362)。

#### 何时提供 `controls` 选项

- 该函数更常用于单个 `ref`，或
- 示例：`useTimestamp`、`useInterval`

```ts
// 常见用法
const timestamp = useTimestamp()

// 更多控制选项，提供更大的灵活性
const { timestamp, pause, resume } = useTimestamp({ controls: true })
```

参考 `useTimestamp` 的源代码以了解正确的 TypeScript 支持实现。

#### 何时**不**提供 `controls` 选项

- 该函数更常用于多个返回值
- 示例：`useRafFn`、`useRefHistory`

```ts
const { pause, resume } = useRafFn(() => {})
```

## `isSupported` 标志

当涉及到浏览器尚未广泛实现的 Web API 时，同时输出 `isSupported` 标志。

例如 `useShare`：

```ts
export function useShare(
  shareOptions: MaybeRef<ShareOptions> = {},
  options: ConfigurableNavigator = {},
) {
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator && 'canShare' in navigator)

  const share = async (overrideOptions) => {
    if (isSupported.value) {
      /* ...实现... */
    }
  }

  return {
    isSupported,
    share,
  }
}
```

## 异步可组合函数

当可组合函数是异步的（如 `useFetch`）时，最好从可组合函数返回一个 PromiseLike 对象，这样用户就可以等待该函数。这在使用 Vue 的 `<Suspense>` API 时特别有用。

- 使用 `ref` 来确定函数何时应该解析，例如 `isFinished`
- 将返回状态存储在变量中，因为它必须返回两次，一次在返回值中，一次在 promise 中
- 返回类型应该是返回类型和 PromiseLike 的交集，例如 `UseFetchReturn & PromiseLike<UseFetchReturn>`

```ts
export function useFetch<T>(url: MaybeRefOrGetter<string>): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()
  const isFinished = ref(false)

  fetch(toValue(url))
    .then(r => r.json())
    .then(r => data.value = r)
    .catch(e => error.value = e)
    .finally(() => isFinished.value = true)

  // 将返回状态存储在变量中
  const state: UseFetchReturn<T> = {
    data,
    error,
    isFinished,
  }

  return {
    ...state,
    // 向对象添加 `then` 使其可以被 await
    then(onFulfilled, onRejected) {
      return new Promise<UseFetchReturn<T>>((resolve, reject) => {
        until(isFinished)
          .toBeTruthy()
          .then(() => resolve(state))
          .then(() => reject(state))
      }).then(onFulfilled, onRejected)
    },
  }
}
```

## 无渲染组件

- 使用渲染函数而不是 Vue SFC
- 用 `reactive` 包装 props 以便于将它们作为 props 传递给插槽
- 优先使用函数选项作为 prop 类型，而不是重新创建它们
- 只在函数需要绑定目标时才用 HTML 元素包装插槽

```ts
import type { MouseOptions } from '@vueuse/core'
import { useMouse } from '@vueuse/core'
import { defineComponent, reactive } from 'vue'

export const UseMouse = defineComponent<MouseOptions>({
  name: 'UseMouse',
  props: ['touch', 'resetOnTouchEnds', 'initialValue'] as unknown as undefined,
  setup(props, { slots }) {
    const data = reactive(useMouse(props))

    return () => {
      if (slots.default)
        return slots.default(data)
    }
  },
})
```

有时函数可能有多个参数，在这种情况下，你可能需要创建一个新的接口来将所有接口合并为组件 props 的单一接口。

```ts
import type { TimeAgoOptions } from '@vueuse/core'
import { useTimeAgo } from '@vueuse/core'

interface UseTimeAgoComponentOptions extends Omit<TimeAgoOptions<true>, 'controls'> {
  time: MaybeRef<Date | number | string>
}

export const UseTimeAgo = defineComponent<UseTimeAgoComponentOptions>({ /* ... */ })
```
