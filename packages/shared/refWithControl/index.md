---
category: Reactivity
alias: controlledRef
related: computedWithControl
---

# refWithControl

对 ref 及其响应式进行细粒度控制。

::: warning
此函数仅适用于 Vue 3
:::

## 用法

`refWithControl` 使用 `extendRef` 提供两个额外的函数 `get` 和 `set`，以便更好地控制何时应该跟踪/触发响应式。

```ts
import { refWithControl } from '@vueuse/core'

const num = refWithControl(0)
const doubled = computed(() => num.value * 2)

// 就像普通的 ref
num.value = 42
console.log(num.value) // 42
console.log(doubled.value) // 84

// 设置值而不触发响应式
num.set(30, false)
console.log(num.value) // 30
console.log(doubled.value) // 84 (不更新)

// 获取值而不跟踪响应式
watchEffect(() => {
  console.log(num.peek())
}) // 30

num.value = 50 // watch effect 不会被触发，因为它没有收集任何内容。
console.log(doubled.value) // 100 (再次更新，因为这是一个响应式设置)
```

### `peek`、`lay`、`untrackedGet`、`silentSet`

我们还提供了一些简写，用于在不跟踪/触发响应式系统的情况下进行 get/set 操作。以下行是等效的。

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

提供 `onBeforeChange` 选项来控制是否应该接受新值。例如：

```ts
const num = refWithControl(0, {
  onBeforeChange(value, oldValue) {
    // 在一次操作中不允许变化超过 ±5
    if (Math.abs(value - oldValue) > 5)
      return false // 返回 `false` 以拒绝更改
  },
})

num.value += 1
console.log(num.value) // 1

num.value += 6
console.log(num.value) // 1 (更改被拒绝)
```

### `onChanged()`

`onChanged` 选项提供了类似于 Vue 的 `watch` 的功能，但与 `watch` 相比，它的开销更小，并且是同步的。

```ts
const num = refWithControl(0, {
  onChanged(value, oldValue) {
    console.log(value)
  },
})
```
