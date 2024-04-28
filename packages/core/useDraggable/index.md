---
category: Elements
---

# useDraggable

使元素可拖动。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

// `style` 将作为 `left: ?px; top: ?px;` 的辅助计算属性
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
</script>

<template>
  <div ref="el" :style="style" style="position: fixed">
    拖动我！我在 {{ x }}，{{ y }} 的位置
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseDraggable v-slot="{ x, y }" :initial-value="{ x: 10, y: 10 }">
    拖动我！我在 {{ x }}，{{ y }} 的位置
  </UseDraggable>
</template>
```

对于组件的用法，还可以将附加属性 `storageKey` 和 `storageType` 传递给组件，并启用元素位置的持久化。

```vue
<template>
  <UseDraggable storage-key="vueuse-draggable" storage-type="session">
    刷新页面后，我仍然在相同的位置！
  </UseDraggable>
</template>
```
