---
category: Sensors
---

# useSwipe

基于 [`TouchEvents`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) 的响应式滑动检测。

## 用法

```vue
<script setup>
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')
const { isSwiping, direction } = useSwipe(el)
</script>

<template>
  <div ref="el">
    在这里滑动
  </div>
</template>
```
