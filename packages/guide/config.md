# 配置

这些是 VueUse 中大多数函数的一般配置。

### 事件过滤器

从 v4.0 开始，我们提供了事件过滤器系统，以灵活控制事件触发的时机。例如，您可以使用 `throttleFilter` 和 `debounceFilter` 控制事件触发频率：

```ts twoslash
import { debounceFilter, throttleFilter, useLocalStorage, useMouse } from '@vueuse/core'

// 变化将以 1 秒的节流方式写入 localStorage
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })

// 鼠标位置将在鼠标空闲 100 毫秒后更新
const { x, y } = useMouse({ eventFilter: debounceFilter(100) })
```

此外，您可以利用 `pausableFilter` 暂时暂停某些事件。

```ts twoslash
import { pausableFilter, useDeviceMotion } from '@vueuse/core'

const motionControl = pausableFilter()

const motion = useDeviceMotion({ eventFilter: motionControl.eventFilter })

motionControl.pause()
// 运动更新暂停

motionControl.resume()
// 运动更新恢复
```

### 响应式定时

VueUse 的函数在可能的情况下遵循 Vue 的响应式系统默认的[刷新时机](https://cn.vuejs.org/guide/essentials/watchers#callback-flush-timing)。

对于类似 `watch` 的组合式（例如 `pausableWatch`、`whenever`、`useStorage`、`useRefHistory`），默认值为 `{ flush: 'pre' }`。这意味着它们将缓冲无效的效果并异步刷新它们。当在同一 "tick" 中发生多次状态突变时，避免不必要的重复调用。

与 `watch` 相同，VueUse 允许您通过传递 `flush` 选项来配置时机：

```ts twoslash
import { ref } from 'vue'
import { pausableWatch } from '@vueuse/core'

const counter = ref(0)
const { pause, resume } = pausableWatch(
  counter,
  () => {
    // 安全地访问更新后的 DOM
  },
  { flush: 'post' },
)
```

**flush 选项（默认值：`'pre'`）**

- `'pre'`：在相同 'tick' 中缓冲无效的效果，并在渲染之前刷新它们
- `'post'`：类似于 'pre'，但在组件更新后异步触发，因此您可以访问更新后的 DOM
- `'sync'`：强制效果始终同步触发

**注意：** 对于类似 `computed` 的组合式（例如 `syncRef`、`controlledComputed`），当刷新时机可配置时，默认值更改为 `{ flush: 'sync' }`，以使其与 Vue 中计算引用的工作方式保持一致。

### 可配置的全局依赖项

从 v4.0 开始，访问浏览器 API 的函数将提供一个选项字段，您可以在其中指定全局依赖项（例如 `window`、`document` 和 `navigator`）。它默认使用全局实例，因此在大多数情况下，您不需要担心它。此配置在处理 iframe 和测试环境时非常有用。

```ts twoslash
// @lib: dom
// @noErrors: 18047 2339
import { useMouse } from '@vueuse/core'

// 访问父上下文
const parentMousePos = useMouse({ window: window.parent })

const iframe = document.querySelector('#my-iframe')

// 访问子上下文
const childMousePos = useMouse({ window: iframe.contentWindow })
```

```ts
// 测试
const mockWindow = { /* ... */ }

const { x, y } = useMouse({ window: mockWindow })
```
