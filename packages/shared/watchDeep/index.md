---
category: Watch
---

# watchDeep

使用 `{ deep: true }` 监听值的简写形式。

## 使用方法

类似于 `watch`，但使用 `{ deep: true }`

```ts
import { watchDeep } from '@vueuse/core'

const nestedObject = ref({ foo: { bar: { deep: 5 } } })

watchDeep(nestedObject, (updated) => {
  console.log(updated)
})

onMounted(() => {
  nestedObject.value.foo.bar.deep = 10
})
```
