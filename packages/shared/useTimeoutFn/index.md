---
category: Animation
---

# useTimeoutFn

带有控制选项的 setTimeout 函数的封装

## 用法

```js
import { useTimeoutFn } from '@vueuse/core'

const { isPending, start, stop } = useTimeoutFn(() => {
  /* ... */
}, 3000)
```
