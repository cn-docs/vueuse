---
category: Sensors
---

# useOnline

响应式的在线状态。是 `useNetwork` 的封装。

## 使用方法

```js
import { useOnline } from '@vueuse/core'

const online = useOnline()
```

## 组件使用

```vue
<template>
  <UseOnline v-slot="{ isOnline }">
    是否在线: {{ isOnline }}
  </UseOnline>
</template>
```
