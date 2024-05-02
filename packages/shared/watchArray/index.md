---
category: Watch
---

# watchArray

监视数组的添加和移除。

## 使用方法

类似于 `watch`，但提供了添加和移除的元素给回调函数。如果列表通过 `push`、`splice` 等方法原地更新，请传递 `{ deep: true }`。

```ts
import { watchArray } from '@vueuse/core'

const list = ref([1, 2, 3])

watchArray(list, (newList, oldList, added, removed) => {
  console.log(newList) // [1, 2, 3, 4]
  console.log(oldList) // [1, 2, 3]
  console.log(added) // [4]
  console.log(removed) // []
})

onMounted(() => {
  list.value = [...list.value, 4]
})
```
