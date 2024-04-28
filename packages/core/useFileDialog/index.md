---
category: Browser
---

# useFileDialog

轻松打开文件对话框。

## 使用方法

```ts
import { useFileDialog } from '@vueuse/core'

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // 设置仅接受图像文件
  directory: true, // 如果设置为 true，则选择目录而不是文件
})

onChange((files) => {
  /** 处理文件 */
})
```

```vue
<template>
  <button type="button" @click="open">
    Choose file
  </button>
</template>
```
