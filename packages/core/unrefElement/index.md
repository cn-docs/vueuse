---
category: Component
---

# unrefElement

从 ref 或 Vue 组件实例中检索基础 DOM 元素。

## 用法

```vue
<script setup>
import { unrefElement } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const div = ref() // 将绑定到 <div> 元素
const hello = ref() // 将绑定到 HelloWorld 组件

onMounted(() => {
  console.log(unrefElement(div)) // <div> 元素
  console.log(unrefElement(hello)) // HelloWorld 组件的根元素
})
</script>

<template>
  <div ref="div" />
  <HelloWorld ref="hello" />
</template>
```
