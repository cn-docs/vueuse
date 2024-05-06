---
category: Reactivity
related: toValue
alias: resolveRef
---

# toRef

将值、ref 或 getter 规范化为 `ref` 或 `computed`。

## 用法

```ts
import { toRef } from '@vueuse/core'

const foo = ref('hi')

const a = toRef(0) // Ref<number>
const b = toRef(foo) // Ref<string>
const c = toRef(() => 'hi') // ComputedRef<string>
```
