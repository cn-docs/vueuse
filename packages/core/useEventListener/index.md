---
category: Browser
---

# useEventListener

轻松使用 EventListener。在组件挂载时使用 [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 进行注册，在组件卸载时自动使用 [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) 进行注销。

## 用法

```js
import { useEventListener } from '@vueuse/core'

useEventListener(document, 'visibilitychange', (evt) => {
  console.log(evt)
})
```

你也可以将一个 ref 作为事件目标传递给 `useEventListener`，当你改变目标时，`useEventListener` 会注销之前的事件并注册新的事件。

```ts
import { useEventListener } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const element = useTemplateRef<HTMLDivElement>('element')
useEventListener(element, 'keydown', (e) => {
  console.log(e.key)
})
```

```vue
<template>
  <div v-if="cond" ref="element">
    Div1
  </div>
  <div v-else ref="element">
    Div2
  </div>
</template>
```

你也可以调用返回的函数来注销监听器。

```ts
import { useEventListener } from '@vueuse/core'

const cleanup = useEventListener(document, 'keydown', (e) => {
  console.log(e.key)
})

cleanup() // 这将注销监听器。
```

注意，如果你的组件也在 SSR（服务器端渲染）中运行，你可能会遇到错误（如 `document is not defined`），因为类似 `document` 和 `window` 的 DOM API 在 Node.js 中不可用。为了避免这种情况，你可以将逻辑放在 `onMounted` 钩子内部。

```ts
// onMounted 只会在客户端执行，所以它保证了 DOM API 是可用的。
onMounted(() => {
  useEventListener(document, 'keydown', (e) => {
    console.log(e.key)
  })
})
```
