---
category: Sensors
---

# useParallax

轻松创建视差效果。它使用 `useDeviceOrientation`，如果不支持方向，则回退到 `useMouse`。

## 使用方法

```vue
<script setup>
import { useParallax } from '@vueuse/core'

const container = ref(null)
const { tilt, roll, source } = useParallax(container)
</script>

<template>
  <div ref="container" />
</template>
```
