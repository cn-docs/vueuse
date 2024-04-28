---
category: Animation
---

# useRafFn

在每次 `requestAnimationFrame` 上调用函数。具有暂停和恢复控制。

## 用法

```js
import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'

const count = ref(0)

const { pause, resume } = useRafFn(() => {
  count.value++
  console.log(count.value)
})
```
