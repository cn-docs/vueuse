---
category: Sensors
---

# usePointer

响应式的 [指针状态](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)。

## 基本用法

```js
import { usePointer } from '@vueuse/core'

const { x, y, pressure, pointerType } = usePointer()
```

## 组件用法

默认情况下，该组件将跟踪 `window` 上的指针。

```vue
<template>
  <UsePointer v-slot="{ x, y }">
    x: {{ x }}
    y: {{ y }}
  </UsePointer>
</template>
```

要在元素内跟踪本地位置，请设置 `target="self"`：

```vue
<template>
  <UsePointer v-slot="{ x, y }" target="self">
    x: {{ x }} y: {{ y }}
  </UsePointer>
</template>
```
