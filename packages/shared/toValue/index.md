---
category: Reactivity
related: toRef
alias: resolveUnref
deprecated: true
---

# toValue

获取值/ref/getter 的值。

:::warning

已弃用，请使用 `import { toValue } from 'vue'` 代替。

:::

## 用法

```ts
import { toValue } from '@vueuse/core'

const foo = ref('hi')

const a = toValue(0) // 0
const b = toValue(foo) // 'hi'
const c = toValue(() => 'hi') // 'hi'
```
