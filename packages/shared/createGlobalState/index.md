---
category: State
related: createSharedComposable
---

# createGlobalState

将状态保存在全局作用域中，以便在 Vue 实例之间重复使用。

## 用法

### 不持久化 (存储在内存中)

```js
// store.js
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const count = ref(0)
    return { count }
  }
)
```

一个更详细的示例:

```js
// store.js
import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = ref(0)

    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }

    return { count, doubleCount, increment }
  }
)
```

### 使用持久化

使用 `useStorage` 存储在 `localStorage` 中:

```js
// store.js
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-local-storage', 'initialValue'),
)
```

```js
// component.js
import { useGlobalState } from './store'

export default defineComponent({
  setup() {
    const state = useGlobalState()
    return { state }
  },
})
```
