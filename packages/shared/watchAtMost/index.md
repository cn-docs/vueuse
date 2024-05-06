---
category: Watch
---

# watchAtMost

`watch` 监听器带有触发次数限制。

## 使用方法

类似于 `watch`，但多了一个选项 `count`，用于设置回调函数触发的次数。达到次数后，监听将自动停止。

```ts
import { watchAtMost } from '@vueuse/core'

watchAtMost(
  source,
  () => { console.log('触发!') }, // 最多触发 3 次
  {
    count: 3, // 触发次数
  },
)
```
