---
category: Reactivity
alias: eagerComputed
---

# computedEager

即时计算的计算属性，没有延迟评估。

::: tip
注意💡：如果您正在使用 Vue 3.4+，您可以直接使用 `computed`。因为在 Vue 3.4+ 中，如果计算属性的新值没有变化，`computed`、`effect`、`watch`、`watchEffect`、`render` 的依赖关系将不会触发。
参考: https://github.com/vuejs/core/pull/5912
:::

在 [Vue: When a computed property can be the wrong tool](https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j) 中了解更多。

- 当您进行复杂的计算时，可以受益于缓存和延迟评估，并且只有在确实需要时才应该（重新）计算时，请使用 `computed()`。
- 当您有一个简单的操作，并且返回值很少更改时，请使用 `computedEager()`，通常是一个布尔值。

## 用法

```js
import { computedEager } from '@vueuse/core'

const todos = ref([])
const hasOpenTodos = computedEager(() => !!todos.length)

console.log(hasOpenTodos.value) // false
toTodos.value.push({ title: 'Learn Vue' })
console.log(hasOpenTodos.value) // true
```
