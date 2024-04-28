---
category: Elements
---

# useElementSize

获取 HTML 元素的响应式大小。[ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

## 用法

```vue
<script>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

export default {
  setup() {
    const el = ref(null)
    const { width, height } = useElementSize(el)

    return {
      el,
      width,
      height,
    }
  }
}
</script>

<template>
  <div ref="el">
    Height: {{ height }}
    Width: {{ width }}
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseElementSize v-slot="{ width, height }">
    Width: {{ width }} Height: {{ height }}
  </UseElementSize>
</template>
```

## 指令用法

```vue
<script setup lang="ts">
import { vElementSize } from '@vueuse/components'

function onResize({ width, height }: { width: number, height: number }) {
  console.log(width, height)
}
</script>

<template>
  <textarea v-element-size="onResize" />
  <!-- 使用选项 -->
  <textarea
    v-element-size="[onResize, { width: 100, height: 100 }, { box: 'content-box' }]"
  />
</template>
```
