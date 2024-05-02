---
category: Reactivity
---

# refDefault

将默认值应用于 ref。

## 用法

```ts
import { refDefault, useStorage } from '@vueuse/core'

const raw = useStorage('key')
const state = refDefault(raw, 'default')

raw.value = 'hello'
console.log(state.value) // hello

raw.value = undefined
console.log(state.value) // default
```
