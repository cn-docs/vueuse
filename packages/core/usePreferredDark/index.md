---
category: Browser
---

# usePreferredDark

响应式的深色主题偏好。

## 用法

```js
import { usePreferredDark } from '@vueuse/core'

const isDark = usePreferredDark()
```

## 组件使用

```vue
<template>
  <UsePreferredDark v-slot="{ prefersDark }">
    首选深色主题: {{ prefersDark }}
  </UsePreferredDark>
</template>
```
