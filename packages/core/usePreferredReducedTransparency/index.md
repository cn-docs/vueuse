---
category: Browser
---

# usePreferredReducedTransparency

响应式的 [prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) 媒体查询。

## 用法

```js
import { usePreferredReducedTransparency } from '@vueuse/core'

const preferredTransparency = usePreferredReducedTransparency()
```

## 组件用法

```vue
<template>
  <UsePreferredReducedTransparency v-slot="{ transparency }">
    首选减少透明度: {{ transparency }}
  </UsePreferredReducedTransparency>
</template>
```
