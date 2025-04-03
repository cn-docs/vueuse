---
category: Component
---

# unrefElement

从 ref 或 Vue 组件实例中检索基础 DOM 元素。

## 用法

```vue
<script setup>
import { unrefElement } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'

const div = useTemplateRef<HTMLElement>('div') // will be bound to the <div> element
const hello = useTemplateRef<Component>('hello') // will be bound to the HelloWorld Component

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
