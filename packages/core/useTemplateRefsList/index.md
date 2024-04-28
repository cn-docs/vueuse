---
category: Component
---

# useTemplateRefsList

用于将 refs 绑定到 `v-for` 内的模板元素和组件的快捷方式。

::: warning
此函数仅适用于 Vue 3
:::

## 用法

```vue
<script setup lang="ts">
import { onUpdated } from 'vue'
import { useTemplateRefsList } from '@vueuse/core'

const refs = useTemplateRefsList<HTMLDivElement>()

onUpdated(() => {
  console.log(refs)
})
</script>

<template>
  <div v-for="i of 5" :key="i" :ref="refs.set" />
</template>
```
