---
category: Sensors
---

# useElementHover

获取元素的响应式悬停状态。

## 用法

```vue
<script setup lang="ts">
import { useElementHover } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const myHoverableElement = useTemplateRef<HTMLButtonElement>('myHoverableElement')
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
import { vElementHover } from '@vueuse/components'
import { shallowRef } from 'vue'

const isHovered = shallowRef(false)
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
import { vElementHover } from '@vueuse/components'
import { shallowRef } from 'vue'

const isHovered = shallowRef(false)
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
