---
category: Sensors
---

# usePointerSwipe

基于 [PointerEvents](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) 的响应式滑动检测。

## 用法

```vue
<script setup>
import { usePointerSwipe } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')
const { isSwiping, direction } = usePointerSwipe(el)
</script>

<template>
  <div ref="el">
    在此处滑动
  </div>
</template>
```
