---
category: Utilities
---

# useCloned

对 ref 进行响应式克隆。默认情况下，它使用 `JSON.parse(JSON.stringify())` 进行克隆。

## 使用方法

```ts
import { useCloned } from '@vueuse/core'

const original = ref({ key: 'value' })

const { cloned } = useCloned(original)

original.value.key = 'some new value'

console.log(cloned.value.key) // 'value'
```

## 手动克隆

```ts
import { useCloned } from '@vueuse/core'

const original = ref({ key: 'value' })

const { cloned, sync } = useCloned(original, { manual: true })

original.value.key = 'manual'

console.log(cloned.value.key) // 'value'

sync()

console.log(cloned.value.key)// 'manual'
```

## 自定义克隆函数

例如使用 [`klona`](https://www.npmjs.com/package/klona)：

```ts
import { useCloned } from '@vueuse/core'
import { klona } from 'klona'

const original = ref({ key: 'value' })

const { cloned, sync } = useCloned(original, { clone: klona })
```
