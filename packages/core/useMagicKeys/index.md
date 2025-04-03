---
category: Sensors
---

# useMagicKeys

响应式的按键状态，支持神奇的按键组合。

## 用法

```js
import { useMagicKeys } from '@vueuse/core'

const { shift, space, a /* 你想要监听的按键 */ } = useMagicKeys()

watch(space, (v) => {
  if (v)
    console.log('空格键被按下')
})

watchEffect(() => {
  if (shift.value && a.value)
    console.log('Shift + A 被按下')
})
```

查看 [所有可能的键码](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)。

### 组合键

你可以通过使用 `+` 或 `_` 连接按键来神奇地使用组合键（快捷键/热键）。

```ts
import { useMagicKeys } from '@vueuse/core'

const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+Ctrl+A']

watch(shiftCtrlA, (v) => {
  if (v)
    console.log('Shift + Ctrl + A 被按下')
})
```

```ts
import { useMagicKeys } from '@vueuse/core'

const { Ctrl_A_B, space, alt_s /* ... */ } = useMagicKeys()

watch(Ctrl_A_B, (v) => {
  if (v)
    console.log('Control+A+B 被按下')
})
```

你也可以使用 `whenever` 函数来简化代码：

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const keys = useMagicKeys()

whenever(keys.shift_space, () => {
  console.log('Shift+空格键被按下')
})
```

### 当前按下的按键

提供了一个特殊的 `current` 属性来表示当前所有被按下的按键。

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const { current } = useMagicKeys()

console.log(current) // Set { 'control', 'a' }

whenever(
  () => current.has('a') && !current.has('b'),
  () => console.log('A 被按下但 B 没有被按下'),
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

whenever(shift_cool, () => console.log('Shift + 空格键被按下'))
```

默认情况下，我们为常见用法提供了一些[预配置的别名](https://github.com/vueuse/vueuse/blob/main/packages/core/useMagicKeys/aliasMap.ts)。

### 条件禁用

你可能在应用中有一些 `<input />` 元素，并且不希望用户在聚焦这些输入框时触发魔法按键处理。这里有一个使用 `useActiveElement` 和 `logicAnd` 来实现的例子：

```ts
import { useActiveElement, useMagicKeys, whenever } from '@vueuse/core'
import { logicAnd } from '@vueuse/math'

const activeElement = useActiveElement()
const notUsingInput = computed(() =>
  activeElement.value?.tagName !== 'INPUT'
  && activeElement.value?.tagName !== 'TEXTAREA',)

const { tab } = useMagicKeys()

whenever(logicAnd(tab, notUsingInput), () => {
  console.log('Tab 键在输入框外被按下！')
})
```

### 自定义事件处理

```ts
import { useMagicKeys, whenever } from '@vueuse/core'

const { ctrl_s } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown')
      e.preventDefault()
  },
})

whenever(ctrl_s, () => console.log('Ctrl+S 被按下'))
```

> ⚠️ 这种用法不推荐，请谨慎使用。

### 响应式模式

默认情况下，`useMagicKeys()` 的值是 `Ref<boolean>`。如果你想在模板中使用该对象，可以将其设置为响应式模式。

```ts
const keys = useMagicKeys({ reactive: true })
```

```vue
<template>
  <div v-if="keys.shift">
    你正在按住 Shift 键！
  </div>
</template>
```
