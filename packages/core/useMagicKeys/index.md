---
category: Sensors
---

# useMagicKeys

响应式按键按下状态，支持神奇按键组合。

<RequiresProxy />

## 使用方法

```js
import { useMagicKeys } from '@vueuse/core'

const { shift, space, a /* keys you want to monitor */ } = useMagicKeys()

watch(space, (v) => {
  if (v)
    console.log('空格键被按下')
})

watchEffect(() => {
  if (shift.value && a.value)
    console.log('Shift + A 已经被按下')
})
```

检查[所有可能的按键码](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。

### 组合键

您可以通过使用 `+` 或 `_` 将键连接起来，以使用组合键（快捷键/热键）。

```ts
import { useMagicKeys } from '@vueuse/core'

const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+Ctrl+A']

watch(shiftCtrlA, (v) => {
  if (v)
    console.log('Shift + Ctrl + A 已经被按下')
})
```

```ts
import { useMagicKeys } from '@vueuse/core'

const { Ctrl_A_B, space, alt_s /* ... */ } = useMagicKeys()

watch(Ctrl_A_B, (v) => {
  if (v)
    console.log('Control+A+B 已经被按下')
})
```

您还可以使用 `whenever` 函数来使代码更简洁

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const keys = useMagicKeys()

whenever(keys.shift_space, () => {
  console.log('Shift+Space 已经被按下')
})
```

### 当前按下的键

提供了一个特殊的属性 `current`，用于表示当前按下的所有键。

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const { current } = useMagicKeys()

console.log(current) // Set { 'control', 'a' }

whenever(
  () => current.has('a') && !current.has('b'),
  () => console.log('A 键被按下，但 B 键没有被按下'),
)
```

### 按键别名

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const { shift_cool } = useMagicKeys({
  aliasMap: {
    cool: 'space',
  },
})

whenever(shift_cool, () => console.log('Shift + Space 已经被按下'))
```

默认情况下，我们有一些[用于常见做法的预配置别名](https://github.com/vueuse/vueuse/blob/main/packages/core/useMagicKeys/aliasMap.ts)。

### 有条件地禁用

您可能在应用程序中有一些 `<input />` 元素，当用户聚焦在这些输入框上时，您不希望触发神奇按键处理。这里有一个使用 `useActiveElement` 和 `logicAnd` 的示例来实现这一点。

```ts
import { useActiveElement, useMagicKeys, whenever } from '@vueuse/core'
import { logicAnd } from '@vueuse/math'

const activeElement = useActiveElement()
const notUsingInput = computed(() =>
  activeElement.value?.tagName !== 'INPUT'
  && activeElement.value?.tagName !== 'TEXTAREA',)

const { tab } = useMagicKeys()

whenever(logicAnd(tab, notUsingInput), () => {
  console.log('Tab 键被按下，不在输入框中！')
})
```

### 自定义事件处理程序

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const { ctrl_s } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown')
      e.preventDefault()
  },
})

whenever(ctrl_s, () => console.log('Ctrl+S 已经被按下'))
```

> ⚠️ 不建议使用此用法，请谨慎使用。

### 响应式模式

默认情况下，`useMagicKeys()` 的值是 `Ref<boolean>`。如果您想在模板中使用对象，则可以将其设置为响应式模式。

```ts
const keys = useMagicKeys({ reactive: true })
```

```vue
<template>
  <div v-if="keys.shift">
    您按住了 Shift 键！
  </div>
</template>
```
