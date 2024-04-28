---
category: Elements
---

# useActiveElement

响应式地获取 `document.activeElement`

## 用法

```js
import { useActiveElement } from '@vueuse/core'

const activeElement = useActiveElement()

watch(activeElement, (el) => {
  console.log('当前活动元素是', el)
})
```

## 组件用法

```vue
<template>
  <UseActiveElement v-slot="{ element }">
    当前活动元素是 {{ element.dataset.id }}
  </UseActiveElement>
</template>
```
