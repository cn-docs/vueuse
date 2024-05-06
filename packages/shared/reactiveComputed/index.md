---
category: Reactivity
---

# reactiveComputed

响应式计算对象。与 `computed` 返回 ref 不同，`reactiveComputed` 返回一个响应式对象。

<RequiresProxy />

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
