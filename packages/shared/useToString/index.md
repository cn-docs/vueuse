---
category: Utilities
---

# useToString

将 ref 转换为字符串。

## 使用方法

```ts
import { useToString } from '@vueuse/core'

const number = ref(3.14)
const str = useToString(number)

str.value // '3.14'
```
