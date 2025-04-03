---
category: Browser
related:
  - useClipboard
---

# useClipboardItems

响应式的 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)。提供响应剪贴板命令（剪切、复制和粘贴）的能力，以及异步读取和写入系统剪贴板的能力。对剪贴板内容的访问受 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 的限制。没有用户权限，不允许读取或更改剪贴板内容。

## 与 `useClipboard` 的区别

`useClipboard` 是一个"仅文本"的函数，而 `useClipboardItems` 是一个基于 [ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) 的函数。你可以使用 `useClipboardItems` 来复制 [ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) 支持的任何内容。

## 用法

```js
import { useClipboardItems } from '@vueuse/core'

const mime = 'text/plain'
const source = ref([
  new ClipboardItem({
    [mime]: new Blob(['plain text'], { type: mime }),
  })
])

const { content, copy, copied, isSupported } = useClipboardItems({ source })
```

```vue
<template>
  <div v-if="isSupported">
    <button @click="copy(source)">
      <!-- 默认情况下，`copied` 将在 1.5 秒后重置 -->
      <span v-if="!copied">复制</span>
      <span v-else>已复制!</span>
    </button>
    <p>
      当前复制的内容: <code>{{ content || '无' }}</code>
    </p>
  </div>
  <p v-else>
    你的浏览器不支持 Clipboard API
  </p>
</template>
```
