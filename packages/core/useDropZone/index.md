---
category: Elements
---

# useDropZone

创建一个可接收文件拖放的区域。

## 用法

```vue
<script setup lang="ts">
import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  // 当文件被拖放到区域时调用
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  dataTypes: ['image/jpeg'],
  // control multi-file drop
  multiple: true,
  // whether to prevent default behavior for unhandled events
  preventDefaultForUnhandled: false,
})
</script>

<template>
  <div ref="dropZoneRef">
    拖放文件到这里
  </div>
</template>
```
