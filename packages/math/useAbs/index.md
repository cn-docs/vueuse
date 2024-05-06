---
category: '@Math'
---

# useAbs

响应式 `Math.abs`。

## 用法

```ts
import { useAbs } from '@vueuse/math'

const value = ref(-23)
const absValue = useAbs(value) // Ref<23>
```
