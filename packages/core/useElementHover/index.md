---
category: Sensors
---

# useElementHover

获取元素的响应式悬停状态。

## 用法

```vue
<script setup>
import { useElementHover } from '@vueuse/core'

const myHoverableElement = ref()
const isHovered = useElementHover(myHoverableElement)
</script>

<template>
  <button ref="myHoverableElement">
    {{ isHovered }}
  </button>
</template>
```

## 指令用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { vElementHover } from '@vueuse/components'

const isHovered = ref(false)
function onHover(state: boolean) {
  isHovered.value = state
}
</script>

<template>
  <button v-element-hover="onHover">
    {{ isHovered ? '谢谢！' : '悬停我' }}
  </button>
</template>
```

You can also provide hover options:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { vElementHover } from '@vueuse/components'

const isHovered = ref(false)
function onHover(hovered: boolean) {
  isHovered.value = hovered
}
</script>

<template>
  <button v-element-hover="[onHover, { delayEnter: 1000 }]">
    <span>{{ isHovered ? 'Thank you!' : 'Hover me' }}</span>
  </button>
</template>
```
