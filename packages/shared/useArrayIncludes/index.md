---
category: Array
---

# useArrayIncludes

响应式 `Array.includes`。

## 用法

### 与响应式数组一起使用

```js
import { useArrayIncludes } from '@vueuse/core'

const list = ref([0, 2, 4, 6, 8])
const result = useArrayIncludes(list, 10)
// result.value: false
list.value.push(10)
// result.value: true
list.value.pop()
// result.value: false
```
