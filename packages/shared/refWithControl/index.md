---
category: Reactivity
alias: controlledRef
related: computedWithControl
---

# refWithControl

对 ref 及其响应性进行细粒度控制。

::: warning
此函数仅适用于 Vue 3
:::

## 用法

`refWithControl` 使用 `extendRef` 来提供两个额外函数 `get` 和 `set`，以便更好地控制何时应该跟踪/触发响应性。

```ts
import { refWithControl } from '@vueuse/core'

const num = refWithControl(0)
const doubled = computed(() => num.value * 2)

// 就像普通的 ref 一样
num.value = 42
console.log(num.value) // 42
console.log(doubled.value) // 84

// 设置值而不触发响应性
num.set(30, false)
console.log(num.value) // 30
console.log(doubled.value) // 84（不会更新）

// 获取值而不跟踪响应性
watchEffect(() => {
  console.log(num.peek())
}) // 30

num.value = 50 // watch effect 不会被触发，因为它收集了空值。
console.log(doubled.value) // 100（再次更新，因为它是一个响应式设置）
```

### `peek`, `lay`, `untrackedGet`, `silentSet`

我们还提供了一些简写，用于在不跟踪/触发响应性系统的情况下进行获取/设置。以下代码是等效的。

```ts
const foo = refWithControl('foo')
```

```ts
// 获取
foo.get(false)
foo.untrackedGet()
foo.peek() // `untrackedGet` 的别名
```

```ts
// 设置
foo.set('bar', false)
foo.silentSet('bar')
foo.lay('bar') // `silentSet` 的别名
```

## 配置

### `onBeforeChange()`

提供 `onBeforeChange` 选项，以控制是否应接受新值。例如：

```ts
const num = refWithControl(0, {
  onBeforeChange(value, oldValue) {
    // 禁止一次操作中的更改大于 ±5
    if (Math.abs(value - oldValue) > 5)
      return false // 返回 `false` 以取消更改
  },
})

num.value += 1
console.log(num.value) // 1

num.value += 6
console.log(num.value) // 1（更改被取消）
```

### `onChanged()`

`onChanged` 选项提供了类似于 Vue 的 `watch` 的功能，但与 `watch` 相比，具有更少的开销且同步。

```ts
const num = refWithControl(0, {
  onChanged(value, oldValue) {
    console.log(value)
  },
})
```
