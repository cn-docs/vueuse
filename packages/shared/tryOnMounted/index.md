---
category: Component
---

# tryOnMounted

安全的 `onMounted`。如果在组件生命周期内，调用 `onMounted()`，如果不是，直接调用函数。

## 用法

```js
import { tryOnMounted } from '@vueuse/core'

tryOnMounted(() => {

})
```
