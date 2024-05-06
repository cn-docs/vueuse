---
category: Component
---

# tryOnBeforeUnmount

安全的 `onBeforeUnmount`。如果在组件生命周期内，调用 `onBeforeUnmount()`，如果不是，不执行任何操作。

## 用法

```js
import { tryOnBeforeUnmount } from '@vueuse/core'

tryOnBeforeUnmount(() => {

})
```
