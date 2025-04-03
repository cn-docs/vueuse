---
category: Array
---

# useArrayDifference

响应式获取两个数组的差集。

默认情况下，它返回第一个数组相对于第二个数组的差集，即 `A \ B`，[相对补集](<https://en.wikipedia.org/wiki/Complement_(set_theory)>)。

你可以通过传递 `symmetric` 选项来获取两个数组的[对称差集](https://en.wikipedia.org/wiki/Symmetric_difference) `A △ B`。

## 用法

### 与响应式数组一起使用

```js
import { useArrayDifference } from '@vueuse/core'

const list1 = ref([0, 1, 2, 3, 4, 5])
const list2 = ref([4, 5, 6])
const result = useArrayDifference(list1, list2)
// result.value: [0, 1, 2, 3]
list2.value = [0, 1, 2]
// result.value: [3, 4, 5]
```

### 与响应式数组一起使用并使用函数比较

```js
import { useArrayDifference } from '@vueuse/core'

const list1 = ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
const list2 = ref([{ id: 4 }, { id: 5 }, { id: 6 }])

const result = useArrayDifference(list1, list2, (value, othVal) => value.id === othVal.id)
// result.value: [{ id: 1 }, { id: 2 }, { id: 3 }]
```

### 对称差集

这个组合式函数也支持通过传递 `symmetric` 选项来获取[对称差集](https://en.wikipedia.org/wiki/Symmetric_difference)。

```js
import { useArrayDifference } from '@vueuse/core'

const list1 = ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
const list2 = ref([{ id: 4 }, { id: 5 }, { id: 6 }])

const result = useArrayDifference(
  list1,
  list2,
  (value, othVal) => value.id === othVal.id,
  { symmetric: true } // [!code hl]
)
// result.value: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 6 }]
```
