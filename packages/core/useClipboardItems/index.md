---
category: Browser
related:
  - useClipboard
---

# useClipboardItems

使用 [剪贴板 API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)。提供对剪切、复制和粘贴命令的响应能力，以及异步从系统剪贴板读取和写入的功能。通过 [权限 API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 进行访问控制，未经用户许可，不允许读取或更改剪贴板内容。

## 与 `useClipboard` 的区别

`useClipboard` 是一个“仅限文本”的函数，而 `useClipboardItems` 基于 [ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem)。你可以使用 `useClipboardItems` 复制 [ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) 支持的任何内容。

## 使用方式

```js
import { useClipboardItems } from '@vueuse/core'

const mime = 'text/html'
const source = ref([
  new ClipboardItem({
    [mime]: new Blob(['\'<b>HTML content</b>\'', { type: mime }]),
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
      <span v-else>已复制！</span>
    </button>
    <p>
      当前已复制内容：<code>{{ text || '无' }}</code>
    </p>
  </div>
  <p v-else>
    您的浏览器不支持剪贴板 API
  </p>
</template>
```
