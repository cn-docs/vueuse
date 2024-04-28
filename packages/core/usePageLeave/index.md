---
category: Sensors
---

# usePageLeave

响应式状态，用于显示鼠标是否离开页面。

## 使用方法

```js
import { usePageLeave } from '@vueuse/core'

const isLeft = usePageLeave()
```

## 组件使用

```vue
<template>
  <UsePageLeave v-slot="{ isLeft }">
    是否离开页面: {{ isLeft }}
  </UsePageLeave>
</template>
```
