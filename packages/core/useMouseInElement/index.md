---
category: Elements
---

# useMouseInElement

与元素相关的鼠标位置的响应式状态

## 用法

```vue
<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')

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

## Directive Usage

```vue
<script setup lang="ts">
import { vMouseInElement } from '@vueuse/components'
import { UseMouseSourceType } from '@vueuse/core'

interface MouseInElementType {
  x: number
  y: number
  sourceType: UseMouseSourceType
  elementX: number
  elementY: number
  elementPositionX: number
  elementPositionY: number
  elementHeight: number
  elementWidth: number
  isOutside: boolean
}

const options = {
  handleOutside: true
}
function onMouseInElement({ x, y, sourceType, elementX, elementY, elementPositionX, elementPositionY, elementHeight, elementWidth, isOutside }: MouseInElementType) {
  console.log(x, y, sourceType, elementX, elementY, elementPositionX, elementPositionY, elementHeight, elementWidth, isOutside)
}
</script>

<template>
  <textarea v-mouse-in-element="onMouseInElement" />
  <!-- with options -->
  <textarea v-mouse-in-element="[onMouseInElement, options]" />
</template>
```
