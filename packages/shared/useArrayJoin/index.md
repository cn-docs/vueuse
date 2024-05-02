---
category: Array
---

# useArrayJoin

响应式 `Array.join`。

## 用法

### 与多个 ref 组成的数组一起使用

```js
import { useArrayJoin } from '@vueuse/core'

const item1 = ref('foo')
const item2 = ref(0)
const item3 = ref({ prop: 'val' })
const list = [item1, item2, item3]
const result = useArrayJoin(list)
// result.value: foo,0,[object Object]
item1.value = 'bar'
// result.value: bar,0,[object Object]
```

### 与响应式数组一起使用

```js
import { useArrayJoin } from '@vueuse/core'

const list = ref(['string', 0, { prop: 'val' }, false, [1], [[2]], null, undefined, []])
const result = useArrayJoin(list)
// result.value: string,0,[object Object],false,1,2,,,
list.value.push(true)
// result.value: string,0,[object Object],false,1,2,,,,true
list.value = [null, 'string', undefined]
// result.value: ,string,
```

### 与响应式分隔符一起使用

```js
import { useArrayJoin } from '@vueuse/core'

const list = ref(['string', 0, { prop: 'val' }])
const separator = ref()
const result = useArrayJoin(list, separator)
// result.value: string,0,[object Object]
separator.value = ''
// result.value: string0[object Object]
separator.value = '--'
// result.value: string--0--[object Object]
```
