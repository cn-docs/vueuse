---
category: '@Math'
alias: or
related: logicAnd, logicNot
---

# logicOr

`OR` 条件的响应式封装。

## 用法

```ts
import { logicOr } from '@vueuse/math'
import { whenever } from '@vueuse/core'

const a = ref(true)
const b = ref(false)

whenever(logicOr(a, b), () => {
  console.log('a 或 b 为 true')
})
```
