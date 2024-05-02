---
category: Utilities
---

# useCounter

基础计数器，带有工具函数。

## 基本用法

```js
import { useCounter } from '@vueuse/core'

const { count, inc, dec, set, reset } = useCounter()
```

## 带有选项的用法

```js
import { useCounter } from '@vueuse/core'

const { count, inc, dec, set, reset } = useCounter(1, { min: 0, max: 16 })
```
