---
category: Utilities
---

# usePrevious

保存 ref 的先前值。

## 用法

```ts
import { ref } from 'vue'
import { usePrevious } from '@vueuse/core'

const counter = ref('Hello')
const previous = usePrevious(counter)

console.log(previous.value) // undefined

counter.value = 'World'

console.log(previous.value) // Hello
```
