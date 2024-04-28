---
category: Sensors
---

# useElementByPoint

根据点获取响应式元素。

## 用法

```ts
import { useElementByPoint, useMouse } from '@vueuse/core'

const { x, y } = useMouse({ type: 'client' })
const { element } = useElementByPoint({ x, y })
```
