---
category: Browser
---

# useClipboard

响应式的 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)。提供对剪贴板命令（剪切、复制和粘贴）的响应能力，以及异步读取和写入系统剪贴板的能力。访问剪贴板内容的权限受到 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 的限制。未经用户许可，不允许读取或更改剪贴板内容。

<CourseLink href="https://vueschool.io/lessons/reactive-browser-wrappers-in-vueuse-useclipboard?friend=vueuse">通过 Vue School 的这个免费视频课程学习如何使用 useClipboard 将文本响应式保存到剪贴板！</CourseLink>

## 使用方法

```vue
<script>
import { useClipboard } from '@vueuse/core'

const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })
</script>

<template>
  <div v-if="isSupported">
    <button @click="copy(source)">
      <!-- 默认情况下，`copied` 将在 1.5 秒后重置 -->
      <span v-if="!copied">复制</span>
      <span v-else>已复制！</span>
    </button>
    <p>当前已复制的内容: <code>{{ text || 'none' }}</code></p>
  </div>
  <p v-else>
    您的浏览器不支持 Clipboard API
  </p>
</template>
```

如果 [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) 不可用，设置 `legacy: true` 来保留复制的能力。它将使用 [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) 作为回退处理复制。

## 组件使用

```vue
<template>
  <UseClipboard v-slot="{ copy, copied }" source="copy me">
    <button @click="copy()">
      {{ copied ? '已复制' : '复制' }}
    </button>
  </UseClipboard>
</template>
```

```

```
