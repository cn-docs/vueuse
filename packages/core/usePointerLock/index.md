---
category: Sensors
---

# usePointerLock

响应式的 [指针锁定](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)。

## 基本用法

```js
import { usePointerLock } from '@vueuse/core'

const { isSupported, lock, unlock, element, triggerElement } = usePointerLock()
```

## 组件用法

```vue
<template>
  <UsePointerLock v-slot="{ lock }">
    <canvas />
    <button @click="lock">
      在画布上锁定指针
    </button>
  </UsePointerLock>
</template>
```
