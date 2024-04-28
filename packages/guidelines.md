# 声明

中文文档由社区维护，若出现滞后或错误，请以官方文档为准，欢迎提交 PR。

文档地址：https://github.com/cn-docs/vueuse

中文文档以 docs-cn 分支为准

## 指南

以下是 VueUse 函数的使用指南。您也可以将其作为编写自己的可组合函数或应用程序的参考。

您还可以在 [Anthony Fu](https://github.com/antfu) 关于 VueUse 的演讲中找到这些设计决策的原因以及编写可组合函数的一些提示：

- [Composable Vue](https://antfu.me/posts/composable-vue-vueday-2021) - 于 VueDay 2021
- [可组合的 Vue](https://antfu.me/posts/composable-vue-vueconf-china-2021) - 于 VueConf 中国 2021（中文）

## 通用

- 从 `"vue-demi"` 导入所有 Vue API
- 尽可能使用 `ref` 而不是 `reactive`
- 尽可能使用选项对象作为参数，以便更灵活地进行未来扩展。
- 当包装大量数据时，使用 `shallowRef` 而不是 `ref`
- 使用 `configurableWindow`（等）处理全局变量如 `window`，以便在处理多窗口、测试模拟和 SSR 时更加灵活。
- 当涉及到浏览器尚未广泛实现的 Web API 时，还应输出 `isSupported` 标志
- 在内部使用 `watch` 或 `watchEffect` 时，尽可能使 `immediate` 和 `flush` 选项可配置
- 使用 `tryOnUnmounted` 优雅地清除副作用
- 避免使用控制台日志
- 当函数是异步的，返回一个 PromiseLike

另见：[最佳实践](./guide/best-practice.md)

## ShallowRef

在包装大量数据时，请使用 `shallowRef` 而不是 `ref`。

```ts
export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  // 使用 `shallowRef` 来防止深层响应式
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

在使用像 `window` 或 `document` 这样的全局变量时，支持在选项接口中添加 `configurableWindow` 或 `configurableDocument`，以便在多窗口、测试模拟和服务器端渲染等场景下使函数更具灵活性。

了解更多实现细节：[\_configurable.ts](https://github.com/vueuse/vueuse/blob/main/packages/core/_configurable.ts)

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

  // 在 Node.js 环境下跳过
  if (window) {
    window.addEventListener('blur', () => {
      el = window?.document.activeElement
    }, true)
  }

  /* ... */
}
```

用法示例：

```ts
// 在 iframe 中绑定到父窗口
useActiveElement({ window: window.parent })
```

## Watch Options

在内部使用 `watch` 或 `watchEffect` 时，尽可能使 `immediate` 和 `flush` 选项可配置。例如 `watchDebounced`：

```ts
import type { WatchOptions } from 'vue-demi'

// 扩展 WatchOptions
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
    options, // 传递 watch options
  )
}
```

## Controls

我们使用 `controls` 选项，允许用户在简单使用情况下使用单一返回的函数，同时在需要时具有更多控制和灵活性。阅读更多：[#362](https://github.com/vueuse/vueuse/pull/362)。

#### 何时提供 `controls` 选项

- 该函数更常用于单一的 `ref` 或
- 示例：`useTimestamp`、`useInterval`，

```ts
// 常见用法
const timestamp = useTimestamp()

// 更多控制以获取灵活性
const { timestamp, pause, resume } = useTimestamp({ controls: true })
```

请参考 `useTimestamp` 的源代码，以获取适当的 TypeScript 支持实现。

#### 何时 **不要** 提供 `controls` 选项

- 该函数更常用于多个返回值
- 示例：`useRafFn`、`useRefHistory`，

```ts
const { pause, resume } = useRafFn(() => {})
```

## `isSupported` 标识

当涉及到尚未被浏览器广泛实现的 Web API 时，也会输出 isSupported 标志。

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
      /* ...implementation */
    }
  }

  return {
    isSupported,
    share,
  }
}
```

## 异步组合式函数

当一个组合式函数是异步的，比如 `useFetch`，最好从该函数返回一个 PromiseLike 对象，以便用户能够等待该函数完成。这对于 Vue 的 `<Suspense>` API 尤其有用。

- 使用一个 `ref`（如 `isFinished`）来确定函数何时应解析完成。
- 将返回的状态存储在一个变量中，因为它需要在返回值和 Promise 中各返回一次。
- 返回类型应该是返回类型与 PromiseLike 的交集，例如 `UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>`。

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
    // 添加 `then` 方法使对象符合 Promise A+ 规范
    then(onFulfilled, onRejected) {
      return new Promise<UseFetchReturn<T>>((resolve, reject) => {
        until(isFinished)
          .toBeTruthy()
          .then(() => resolve(state))
          .catch(() => reject(state))
      }).then(onFulfilled, onRejected)
    },
  }
}
```

## 无渲染组件

- 使用渲染函数而非 Vue 单文件组件（SFC）。
- 将 props 包裹在 `reactive` 中，以便轻松地将它们作为属性传递给插槽。
- 偏好使用功能选项作为 props 类型，而不是自己重新创建它们。
- 仅当函数需要绑定目标时，才将插槽包裹在 HTML 元素中。

```ts
import { defineComponent, reactive } from 'vue-demi'
import type { MouseOptions } from '@vueuse/core'
import { useMouse } from '@vueuse/core'

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

有时，一个函数可能有多个参数，在这种情况下，你可能需要创建一个新的接口，将所有接口合并为组件 props 的单一接口。

```ts
import type { TimeAgoOptions } from '@vueuse/core'
import { useTimeAgo } from '@vueuse/core'

interface UseTimeAgoComponentOptions extends Omit<TimeAgoOptions<true>, 'controls'> {
  time: MaybeRef<Date | number | string>
}

export const UseTimeAgo = defineComponent<UseTimeAgoComponentOptions>({ /* ... */ })
```
