---
category: Utilities
---

# useToNumber

将字符串 ref 转换为数字。

## 使用方法

```ts
import { useToNumber } from '@vueuse/core'
import { shallowRef } from 'vue'

const str = shallowRef('123')
const number = useToNumber(str)

number.value // 123
```
