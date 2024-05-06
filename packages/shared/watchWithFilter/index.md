---
category: Watch
---

# watchWithFilter

带有额外 EventFilter 控制的 `watch`。

## 用法

类似于 `watch`，但提供了额外选项 `eventFilter`，该选项将应用于回调函数。

```ts
import { debounceFilter, watchWithFilter } from '@vueuse/core'

watchWithFilter(
  source,
  () => { console.log('changed!') }, // 回调函数将以 500ms 的防抖方式调用
  {
    eventFilter: debounceFilter(500), // throttledFilter、pausabledFilter 或自定义过滤器
  },
)
```
