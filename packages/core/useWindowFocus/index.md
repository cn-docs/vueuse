---
category: Elements
---

# useWindowFocus

使用 `window.onfocus` 和 `window.onblur` 事件来动态地跟踪窗口焦点状态。

## 用法

```js
import { useWindowFocus } from '@vueuse/core'

const focused = useWindowFocus()
```

## 组件使用

```vue
<template>
  <UseWindowFocus v-slot="{ focused }">
    Document Focus: {{ focused }}
  </UseWindowFocus>
</template>
```
