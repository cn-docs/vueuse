---
category: Elements
---

# useMouseInElement

与元素相关的鼠标位置的响应式状态

## 用法

```vue
<script setup>
import { ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const target = ref(null)

const { x, y, isOutside } = useMouseInElement(target)
</script>

<template>
  <div ref="target">
    <h1>Hello world</h1>
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseMouseInElement v-slot="{ elementX, elementY, isOutside }">
    x: {{ elementX }}
    y: {{ elementY }}
    是否在外部: {{ isOutside }}
  </UseMouseInElement>
</template>
```
