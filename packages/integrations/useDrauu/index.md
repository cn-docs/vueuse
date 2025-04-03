---
category: '@Integrations'
---

# useDrauu

这是 [drauu](https://github.com/antfu/drauu) 的响应式实例。

## 安装

```bash
npm i drauu@^0
```

## 使用

```vue
<script setup lang="ts">
import { toRefs } from '@vueuse/core'
import { useDrauu } from '@vueuse/integrations/useDrauu'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<SVGSVGElement>('target')
const { undo, redo, canUndo, canRedo, brush } = useDrauu(target)
const { color, size } = toRefs(brush)
</script>

<template>
  <svg ref="target" />
</template>
```
