---
category: State
---

# provideLocal

扩展了 `provide` 方法，使其能够通过调用 `injectLocal` 在同一组件中获取值。

## 用法

```vue
<script setup>
import { injectLocal, provideLocal } from '@vueuse/core'

provideLocal('MyInjectionKey', 1)
const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
</script>
```
