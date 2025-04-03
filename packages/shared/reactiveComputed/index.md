---
category: Reactivity
---

# reactiveComputed

计算响应式对象。与 `computed` 返回一个 ref 不同，`reactiveComputed` 返回一个响应式对象。

## 用法

```ts
import { reactiveComputed } from '@vueuse/core'

const state = reactiveComputed(() => {
  return {
    foo: 'bar',
    bar: 'baz',
  }
})

state.bar // 'baz'
```
