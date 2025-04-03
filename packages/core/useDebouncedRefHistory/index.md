---
category: State
related:
  - useRefHistory
  - useThrottledRefHistory
---

# useDebouncedRefHistory

具有防抖过滤器的 `useRefHistory` 的简写。

## 用法

此函数在计数器值开始变化时，会在 1000ms 后对其进行快照。

```ts
import { useDebouncedRefHistory } from '@vueuse/core'
import { shallowRef } from 'vue'

const counter = shallowRef(0)
const { history, undo, redo } = useDebouncedRefHistory(counter, { deep: true, debounce: 1000 })
```
