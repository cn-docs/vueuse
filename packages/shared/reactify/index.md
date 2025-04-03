---
category: Reactivity
alias: createReactiveFn
---

# reactify

将普通函数转换为响应式函数。转换后的函数接受引用作为其参数，并返回一个 ComputedRef，具有正确的类型。

::: tip
想要看一些应用示例或者寻找一些预先已转换为响应式的函数吗？

查看 [⚗️ Vue Chemistry](https://github.com/antfu/vue-chemistry)!
:::

## 用法

基本示例

```ts
import { reactify } from '@vueuse/core'
import { shallowRef } from 'vue'

// 一个普通函数
function add(a: number, b: number): number {
  return a + b
}

// 现在它接受引用并返回一个计算引用
// (a: number | Ref<number>, b: number | Ref<number>) => ComputedRef<number>
const reactiveAdd = reactify(add)

const a = shallowRef(1)
const b = shallowRef(2)
const sum = reactiveAdd(a, b)

console.log(sum.value) // 3

a.value = 5

console.log(sum.value) // 7
```

实现响应式 [勾股定理](https://en.wikipedia.org/wiki/Pythagorean_theorem) 的示例。

```ts
import { reactify } from '@vueuse/core'
import { shallowRef } from 'vue'

const pow = reactify(Math.pow)
const sqrt = reactify(Math.sqrt)
const add = reactify((a: number, b: number) => a + b)

const a = shallowRef(3)
const b = shallowRef(4)
const c = sqrt(add(pow(a, 2), pow(b, 2)))
console.log(c.value) // 5

// 5:12:13
a.value = 5
b.value = 12
console.log(c.value) // 13
```

你也可以这样做:

```ts
import { reactify } from '@vueuse/core'
import { shallowRef } from 'vue'

function pythagorean(a: number, b: number) {
  return Math.sqrt(a ** 2 + b ** 2)
}

const a = shallowRef(3)
const b = shallowRef(4)

const c = reactify(pythagorean)(a, b)
console.log(c.value) // 5
```

另一个将 `stringify` 变为响应式的示例

```ts
import { reactify } from '@vueuse/core'
import { shallowRef } from 'vue'

const stringify = reactify(JSON.stringify)

const obj = shallowRef(42)
const dumped = stringify(obj)

console.log(dumped.value) // '42'

obj.value = { foo: 'bar' }

console.log(dumped.value) // '{"foo":"bar"}'
```
