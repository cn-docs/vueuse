---
category: Watch
---

# watchImmediate

使用 `{ immediate: true }` 监听值的简写形式。

## 使用方法

类似于 `watch`，但使用 `{ immediate: true }`

```ts
import { watchImmediate } from '@vueuse/core'

const obj = ref('vue-use')

// 从某些外部存储/组合中更改值
obj.value = 'VueUse'

watchImmediate(obj, (updated) => {
  console.log(updated) // Console.log will be logged twice
})
```
