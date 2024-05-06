---
category: Component
---

# tryOnUnmounted

安全的 `onUnmounted`。如果在组件生命周期内，调用 `onUnmounted()`，如果不是，不执行任何操作。

## 用法

```js
import { tryOnUnmounted } from '@vueuse/core'

tryOnUnmounted(() => {

})
```
