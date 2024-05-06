---
category: Watch
alias: debouncedWatch
---

# watchDebounced

延迟触发的监听器

## 使用方法

类似于 `watch`，但提供额外选项 `debounce` 和 `maxWait`，它们将应用于回调函数。

```ts
import { watchDebounced } from '@vueuse/core'

watchDebounced(
  source,
  () => { console.log('变化了！') },
  { debounce: 500, maxWait: 1000 },
)
```

本质上，它是以下代码的简写形式：

```ts
import { debounceFilter, watchWithFilter } from '@vueuse/core'

watchWithFilter(
  source,
  () => { console.log('变化了！') },
  {
    eventFilter: debounceFilter(500, { maxWait: 1000 }),
  },
)
```
