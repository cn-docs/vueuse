---
category: Elements
---

# useWindowSize

响应式窗口大小

## 用法

```js
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
```

## 组件使用

```vue
<template>
  <UseWindowSize v-slot="{ width, height }">
    Width: {{ width }}
    Height: {{ height }}
  </UseWindowSize>
</template>
```
