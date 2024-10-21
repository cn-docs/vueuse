# 最佳实践

### 解构

VueUse 中的大多数函数返回一个**refs 对象**，你可以使用 [ES6 的对象解构语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)来提取所需的内容。例如：

```ts twoslash
import { useMouse } from '@vueuse/core'

// "x" 和 "y" 是 ref
const { x, y } = useMouse()

console.log(x.value)

const mouse = useMouse()

console.log(mouse.x.value)
```

如果你更喜欢将它们用作对象属性，你可以使用 `reactive()` 来取消引用 ref。例如：

```ts twoslash
import { reactive } from 'vue'
import { useMouse } from '@vueuse/core'

const mouse = reactive(useMouse())

// "x" 和 "y" 将自动取消引用，无需 `.value`
console.log(mouse.x)
```

### 副作用清理

类似于 Vue 的 `watch` 和 `computed` 在组件卸载时会被清理，VueUse 的函数也会自动清理副作用。

例如，`useEventListener` 在组件卸载时会调用 `removeEventListener`。

```ts twoslash
import { useEventListener } from '@vueuse/core'
// ---cut---
// 将自动清理
useEventListener('mousemove', () => {})
```

所有 VueUse 函数都遵循这一约定。

有些函数会返回一个类似于 `watch` 函数的停止处理器，用于手动清理副作用。例如：

```ts twoslash
import { useEventListener } from '@vueuse/core'
// ---cut---
const stop = useEventListener('mousemove', () => {})

// ...

// 手动注销事件监听器
stop()
```

并非所有函数都会返回一个 `stop` 处理器，因此更通用的解决方案是使用 Vue 的 [`effectScope` API](https://cn.vuejs.org/api/reactivity-advanced#effectscope)。

```ts
import { effectScope } from 'vue'

const scope = effectScope()

scope.run(() => {
  // ...

  useEventListener('mousemove', () => {})
  onClickOutside(el, () => {})
  watch(source, () => {})
})

// 所有在 `scope.run` 内调用的组合函数都将被清理
scope.stop()
```

你可以在 [这个 RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md) 中了解更多关于 `effectScope` 的信息。

### 响应式参数

在 Vue 中，我们使用 `setup()` 函数来构建数据和逻辑之间的“连接”。为了使其灵活，大多数 VueUse 函数也接受 ref 作为参数，因为 ref 是响应式的。

以 `useTitle` 为例：

###### 非响应式参数

`useTitle` 组合函数帮助你获取并设置当前页面的 `document.title` 属性。

```ts twoslash
// @lib: dom
import { useDark, useTitle } from '@vueuse/core'
import { watch } from 'vue'
// ---cut---
const isDark = useDark()
const title = useTitle('Hello')

console.log(document.title) // "Hello"

watch(isDark, () => {
  title.value = isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'
})
```

###### Ref 参数

你可以将一个 ref 传递给 `useTitle`，而不是使用返回的 ref。

```ts twoslash
import { useDark, useTitle } from '@vueuse/core'
import { computed } from 'vue'
// ---cut---
const isDark = useDark()
const title = computed(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')

useTitle(title)
```

###### 响应式 Getter 参数

自 VueUse 9.0 起，我们引入了一种新的传递“响应式 Getter”作为参数的约定，它与响应式对象和[响应式转换](https://cn.vuejs.org/guide/extras/reactivity-transform)非常配合。

```ts twoslash
import { useDark, useTitle } from '@vueuse/core'
// ---cut---
const isDark = useDark()

useTitle(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')
```
