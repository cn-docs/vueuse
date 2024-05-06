---
category: Reactivity
alias: controlledComputed
---

# computedWithControl

显式定义计算属性的依赖关系。

## 用法

```ts
import { computedWithControl } from '@vueuse/core'

const source = ref('foo')
const counter = ref(0)

const computedRef = computedWithControl(
  () => source.value, // 监视 source，与 `watch` 相同
  () => counter.value, // 计算属性的 getter，与 `computed` 相同
)
```

通过这种方式，`counter` 的更改不会触发 `computedRef` 更新，但是 `source` ref 会。

```ts
console.log(computedRef.value) // 0

counter.value += 1

console.log(computedRef.value) // 0

source.value = 'bar'

console.log(computedRef.value) // 1
```

### 手动触发

您还可以通过以下方式手动触发计算属性的更新：

```ts
const computedRef = computedWithControl(
  () => source.value,
  () => counter.value,
)

computedRef.trigger()
```

::: warning
手动触发仅适用于 Vue 3
:::
