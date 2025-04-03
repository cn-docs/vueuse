---
category: State
related: useDebouncedRefHistory, useRefHistory
---

# useThrottledRefHistory

带有节流过滤器的 `useRefHistory` 的简写。

## 用法

该函数在计数器的值更改后立即获取第一个快照，并在延迟 1000ms 后获取第二个快照。

```ts
import { useThrottledRefHistory } from '@vueuse/core'
import { shallowRef } from 'vue'

const counter = shallowRef(0)
const { history, undo, redo } = useThrottledRefHistory(counter, { deep: true, throttle: 1000 })
```
