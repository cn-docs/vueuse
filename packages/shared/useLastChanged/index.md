---
category: State
---

# useLastChanged

记录最后更改的时间戳

## 使用方法

```ts
import { useLastChanged } from '@vueuse/core'
import { nextTick } from 'vue-demi'

const a = ref(0)
const lastChanged = useLastChanged(a)

a.value = 1

await nextTick()

console.log(lastChanged.value) // 1704709379457
```

默认情况下，更改将在下一个tick上记录（使用 `watch()` 并且 `flush: 'post'`）。如果你想立即记录更改，请将 `flush: 'sync'` 作为第二个参数传递。

```ts
import { useLastChanged } from '@vueuse/core'

const a = ref(0)
const lastChanged = useLastChanged(a, { flush: 'sync' })

a.value = 1

console.log(lastChanged.value) // 1704709379457
```
