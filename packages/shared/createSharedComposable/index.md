---
category: State
related: createGlobalState
---

# createSharedComposable

创建一个可在多个 Vue 实例中使用的可组合函数。

## 用法

```ts
import { createSharedComposable, useMouse } from '@vueuse/core'

const useSharedMouse = createSharedComposable(useMouse)

// CompA.vue
const { x, y } = useSharedMouse()

// CompB.vue - 将重用先前的状态，不会注册新的事件监听器
const { x, y } = useSharedMouse()
```
