---
category: Browser
---

# useFullscreen

响应式的[全屏 API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)。它添加了方法，用于将特定元素（及其后代）呈现为全屏模式，并在不再需要时退出全屏模式。这使得可以使用用户的整个屏幕来呈现所需的内容，例如在线游戏，在全屏模式下移除所有浏览器用户界面元素和其他应用程序，直到关闭全屏模式为止。

## 使用方法

```js
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
```

指定元素全屏显示。某些平台（例如iOS的Safari）仅允许在视频元素上全屏显示。

```ts
const el = ref(null)

const { isFullscreen, enter, exit, toggle } = useFullscreen(el)
```

```html
<video ref="el"></video>
```

## 组件使用

```html
<div>
  <UseFullscreen v-slot="{ toggle }">
    <video />
    <button @click="toggle">进入全屏模式</button>
  </UseFullscreen>
</div>
```
