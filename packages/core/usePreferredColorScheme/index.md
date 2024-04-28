---
category: Browser
---

# usePreferredColorScheme

响应式的 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 媒体查询。

## 用法

```js
import { usePreferredColorScheme } from '@vueuse/core'

const preferredColor = usePreferredColorScheme()
```

## 组件使用

```vue
<template>
  <UsePreferredColorScheme v-slot="{ colorScheme }">
    首选色彩方案: {{ colorScheme }}
  </UsePreferredColorScheme>
</template>
```
