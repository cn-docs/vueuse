---
category: Array
---

# useArrayUnique

响应式唯一数组。

## 用法

### 与多个 ref 组成的数组一起使用

```js
import { useArrayUnique } from '@vueuse/core'

const item1 = ref(0)
const item2 = ref(1)
const item3 = ref(1)
const item4 = ref(2)
const item5 = ref(3)
const list = [item1, item2, item3, item4, item5]
const result = useArrayUnique(list)
// result.value: [0, 1, 2, 3]
item5.value = 1
// result.value: [0, 1, 2]
```

### 与响应式数组一起使用

```js
import { useArrayUnique } from '@vueuse/core'

const list = reactive([1, 2, 2, 3])
const result = useArrayUnique(list)
// result.value: [1, 2, 3]

list.push(1)
// result.value: [1, 2, 3]
```

### 使用自定义函数

```js
import { useArrayUnique } from '@vueuse/core'

const list = reactive([
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
  { id: 1, name: 'baz' },
])

const result = useArrayUnique(list, (a, b) => a.id === b.id)
// result.value: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]

list.push({ id: 1, name: 'qux' })
// result.value: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]
```
