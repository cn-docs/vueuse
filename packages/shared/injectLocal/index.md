---
category: State
---

# injectLocal

扩展了 `inject`，能够调用 `provideLocal` 在同一组件中提供值。

## 用法

```vue
<script setup>
import { injectLocal, provideLocal } from '@vueuse/core'

provideLocal('MyInjectionKey', 1)
const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
</script>
```
