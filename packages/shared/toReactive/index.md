---
category: Reactivity
---

# toReactive

将 ref 转换为响应式对象。还可以创建一个“可交换”的响应式对象。

<RequiresProxy />

## 用法

```ts
import { toReactive } from '@vueuse/core'

const refState = ref({ foo: 'bar' })

console.log(refState.value.foo) // => 'bar'

const state = toReactive(refState) // <--

console.log(state.foo) // => 'bar'

refState.value = { bar: 'foo' }

console.log(state.foo) // => undefined
console.log(state.bar) // => 'foo'
```
