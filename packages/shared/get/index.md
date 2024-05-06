---
category: Utilities
---

# get

用于访问 `ref.value` 的简写方式

## 用法

```ts
import { get } from '@vueuse/core'

const a = ref(42)

console.log(get(a)) // 42
```
