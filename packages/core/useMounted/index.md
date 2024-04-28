---
category: Component
---

# useMounted

在 ref 中表示组件是否已挂载。

## 使用方法

```js
import { useMounted } from '@vueuse/core'

const isMounted = useMounted()
```

这本质上相当于：

```ts
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
```
