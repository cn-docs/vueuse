---
category: Component
---

# tryOnBeforeMount

安全的 `onBeforeMount`。如果在组件生命周期内，调用 `onBeforeMount()`，如果不是，直接调用函数。

## 用法

```js
import { tryOnBeforeMount } from '@vueuse/core'

tryOnBeforeMount(() => {

})
```
