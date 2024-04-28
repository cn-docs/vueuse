---
category: Browser
---

# usePreferredReducedMotion

响应式的[prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)媒体查询。

## 用法

```js
import { usePreferredReducedMotion } from '@vueuse/core'

const preferredMotion = usePreferredReducedMotion()
```

## 组件使用

```vue
<template>
  <UsePreferredReducedMotion v-slot="{ motion }">
    首选减少动作: {{ motion }}
  </UsePreferredReducedMotion>
</template>
```
