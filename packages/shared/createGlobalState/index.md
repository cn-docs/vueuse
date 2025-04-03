---
category: State
related: createSharedComposable
---

# createGlobalState

将状态保留在全局范围内，以便在 Vue 实例之间重复使用。

## 用法

### 无持久性（存储在内存中）

```js
import { createGlobalState } from '@vueuse/core'
// store.js
import { shallowRef } from 'vue'

export const useGlobalState = createGlobalState(
  () => {
    const count = shallowRef(0)
    return { count }
  }
)
```

更大的示例：

```js
import { createGlobalState } from '@vueuse/core'
// store.js
import { computed, shallowRef } from 'vue'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = shallowRef(0)

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 动作
    function increment() {
      count.value++
    }

    return { count, doubleCount, increment }
  }
)
```

### 使用持久性

使用 `useStorage` 将数据存储在 `localStorage` 中：

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
