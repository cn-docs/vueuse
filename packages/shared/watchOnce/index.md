---
category: Watch
---

# watchOnce

仅触发一次的 `watch`。

## 使用方法

一旦回调函数被触发一次，监听将自动停止。

```typescript
import { watchOnce } from '@vueuse/core'

watchOnce(source, () => {
  // 仅触发一次
  console.log('源发生变化！')
})
```
