---
category: Browser
---

# usePreferredContrast

响应式的 [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) 媒体查询。

## 用法

```js
import { usePreferredContrast } from '@vueuse/core'

const preferredContrast = usePreferredContrast()
```

## 组件使用

```vue
<template>
  <UsePreferredContrast v-slot="{ contrast }">
    首选对比度: {{ contrast }}
  </UsePreferredContrast>
</template>
```
