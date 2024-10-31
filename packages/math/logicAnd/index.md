---
category: '@Math'
alias: and
related: logicNot, logicOr
---

# logicAnd

`AND` 条件的响应式封装。

## 用法

```ts
import { whenever } from '@vueuse/core'
import { logicAnd } from '@vueuse/math'

const a = ref(true)
const b = ref(false)

whenever(logicAnd(a, b), () => {
  console.log('a 和 b 现在都为真值！')
})
```
