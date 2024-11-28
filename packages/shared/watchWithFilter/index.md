---
category: Watch
---

# watchWithFilter

带有额外事件过滤器控制的 `watch`。

## 使用方法

与 `watch` 类似，但提供了一个额外的 `eventFilter` 选项，该选项将应用于回调函数。

```ts
import { debounceFilter, watchWithFilter } from '@vueuse/core'

watchWithFilter(
  source,
  () => { console.log('changed!') }, // 回调函数将以 500ms 防抖的方式被调用
  {
    eventFilter: debounceFilter(500), // 可使用 throttledFilter、pausableFilter 或自定义过滤器
  },
)
```
