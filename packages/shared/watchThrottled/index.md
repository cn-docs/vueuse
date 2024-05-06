---
category: Watch
alias: throttledWatch
---

# watchThrottled

节流式监视。

## 用法

类似于 `watch`，但提供了额外的选项 `throttle`，该选项将应用于回调函数。

```typescript
import { watchThrottled } from '@vueuse/core'

watchThrottled(
  source,
  () => { console.log('changed!') },
  { throttle: 500 },
)
```

实质上，它相当于以下代码的简写：

```typescript
import { throttleFilter, watchWithFilter } from '@vueuse/core'

watchWithFilter(
  source,
  () => { console.log('changed!') },
  {
    eventFilter: throttleFilter(500),
  },
)
```
