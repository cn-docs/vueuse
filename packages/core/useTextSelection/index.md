---
category: Sensors
---

# useTextSelection

基于 [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) 响应式地跟踪用户的文本选择。

## 用法

```vue
<script setup lang="ts">
import { useTextSelection } from '@vueuse/core'
const state = useTextSelection()
</script>

<template>
  <p>{{ state.text }}</p>
</template>
```
