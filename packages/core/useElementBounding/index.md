---
category: Elements
---

# useElementBounding

获取 HTML 元素的响应式 [边界框](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

## 用法

```vue
<script>
import { useElementBounding } from '@vueuse/core'
import { ref } from 'vue'

export default {
  setup() {
    const el = ref(null)
    const { x, y, top, right, bottom, left, width, height }
        = useElementBounding(el)

    return {
      el,
      /* ... */
    }
  },
}
</script>

<template>
  <div ref="el" />
</template>
```

## 组件用法

```vue
<template>
  <UseElementBounding v-slot="{ width, height }">
    Width: {{ width }} Height: {{ height }}
  </UseElementBounding>
</template>
```
