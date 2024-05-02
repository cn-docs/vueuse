---
category: Component
---

# tryOnScopeDispose

安全的 `onScopeDispose`。如果在效果范围生命周期内，调用 `onScopeDispose()`，如果不是，不执行任何操作。

## 用法

```js
import { tryOnScopeDispose } from '@vueuse/core'

tryOnScopeDispose(() => {

})
```
