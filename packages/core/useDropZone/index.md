---
category: Elements
---

# useDropZone

创建一个可以放置文件的区域。

::: warning

由于 Safari 浏览器的限制，文件类型验证只能在 drop 事件期间进行，而不能在 drag 事件期间进行。因此，在 Safari 中，无论文件类型如何，`isOverDropZone` 值在拖拽操作期间将始终为 `true`。

:::

## 用法

```vue
<script setup lang="ts">
import { useDropZone } from '@vueuse/core'

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  // 当文件被放置到区域时调用
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // 指定要接收的数据类型
  dataTypes: ['image/jpeg'],
  // 控制多文件放置
  multiple: true,
  // 是否阻止未处理事件的默认行为
  preventDefaultForUnhandled: false,
})
</script>

<template>
  <div ref="dropZoneRef">
    将文件拖放到这里
  </div>
</template>
```
