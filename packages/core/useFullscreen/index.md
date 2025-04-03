---
category: Browser
---

# useFullscreen

响应式的 [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)。它添加了方法以全屏模式呈现特定元素（及其后代），并在不再需要时退出全屏模式。这使得可以呈现所需的内容（例如在线游戏），使用用户的整个屏幕，在关闭全屏模式之前移除所有浏览器用户界面元素和其他应用程序。

## 用法

```js
import { useFullscreen } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
```

全屏指定元素。某些平台（如 iOS 的 Safari）只允许视频元素全屏。

```ts
const el = useTemplateRef<HTMLElement>('el')

const { isFullscreen, enter, exit, toggle } = useFullscreen(el)
```

```html
<video ref="el"></video>
```

## 组件用法

```vue
<template>
  <UseFullscreen v-slot="{ toggle }">
    <video />
    <button @click="toggle">
      进入全屏
    </button>
  </UseFullscreen>
</template>
```
