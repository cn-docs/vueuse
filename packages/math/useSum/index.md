---
category: '@Math'
---

# useSum

响应式地获取数组的总和。

## 用法

```ts
import { useSum } from '@vueuse/math'

const array = ref([1, 2, 3, 4])
const sum = useSum(array) // Ref<10>
```

```ts
import { useSum } from '@vueuse/math'

const a = ref(1)
const b = ref(3)

const sum = useSum(a, b, 2) // Ref<6>
```
