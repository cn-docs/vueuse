---
category: Utilities
---

# isDefined

用于 Ref 的非空检查类型守卫。

## 用法

```ts
import { isDefined } from '@vueuse/core'

const example = ref(Math.random() ? 'example' : undefined) // Ref<string | undefined>

if (isDefined(example))
  example // Ref<string>
```
