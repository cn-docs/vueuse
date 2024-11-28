---
category: Reactivity
alias: controlledRef
related: computedWithControl
---

# refWithControl

对 ref 及其响应式行为进行精细控制。

::: warning
此函数仅适用于 Vue 3
:::

## 使用方法

`refWithControl` 使用 `extendRef` 提供了两个额外的函数 `get` 和 `set`，用于更好地控制何时应该追踪/触发响应式行为。

```ts
import { refWithControl } from '@vueuse/core'

const num = refWithControl(0)
const doubled = computed(() => num.value * 2)

// 像普通的 ref 一样使用
num.value = 42
console.log(num.value) // 42
console.log(doubled.value) // 84

// 设置值但不触发响应式更新
num.set(30, false)
console.log(num.value) // 30
console.log(doubled.value) // 84 (不会更新)

// 获取值但不追踪响应式依赖
watchEffect(() => {
  console.log(num.peek())
}) // 30

num.value = 50 // watch effect 不会被触发，因为它没有收集到任何依赖
console.log(doubled.value) // 100 (因为是响应式的设置，所以会再次更新)
```

### `peek`、`lay`、`untrackedGet`、`silentSet`

我们还提供了一些简写方法来实现不追踪/触发响应式系统的获取/设置操作。以下几行代码是等效的。

```ts
const foo = refWithControl('foo')
```

```ts
// 获取值
foo.get(false)
foo.untrackedGet()
foo.peek() // `untrackedGet` 的别名
```

```ts
// 设置值
foo.set('bar', false)
foo.silentSet('bar')
foo.lay('bar') // `silentSet` 的别名
```

## 配置选项

### `onBeforeChange()`

`onBeforeChange` 选项用于控制是否接受新的值。例如：

```ts
const num = refWithControl(0, {
  onBeforeChange(value, oldValue) {
    // 不允许一次操作中变化超过 ±5
    if (Math.abs(value - oldValue) > 5)
      return false // 返回 `false` 来拒绝这次改变
  },
})

num.value += 1
console.log(num.value) // 1

num.value += 6
console.log(num.value) // 1 (变化被拒绝)
```

### `onChanged()`

`onChanged` 选项提供了类似于 Vue 的 `watch` 的功能，但是是同步的，并且相比 `watch` 有更少的开销。

```ts
const num = refWithControl(0, {
  onChanged(value, oldValue) {
    console.log(value)
  },
})
```
