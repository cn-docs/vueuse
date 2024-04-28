---
category: Browser
---

# useObjectUrl

响应式对象的 URL。

通过 [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) 为提供的 `File`、`Blob` 或 `MediaSource` 创建一个 URL，并在源发生变化或组件卸载时自动释放 URL，通过 [URL.revokeObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) 实现。

## 使用方法

```vue
<script setup>
import { useObjectUrl } from '@vueuse/core'
import { shallowRef } from 'vue'

const file = shallowRef()
const url = useObjectUrl(file)

function onFileChange(event) {
  file.value = event.target.files[0]
}
</script>

<template>
  <input type="file" @change="onFileChange">

  <a :href="url">打开文件</a>
</template>
```

## 组件使用

```vue
<template>
  <UseObjectUrl v-slot="url" :object="file">
    <a :href="url">打开文件</a>
  </UseObjectUrl>
</template>
```
