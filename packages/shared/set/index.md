---
category: Utilities
---

# set

`ref.value = x` 的简写。

## 用法

```ts
import { set } from '@vueuse/core'

const a = ref(0)

set(a, 1)

console.log(a.value) // 1
```
