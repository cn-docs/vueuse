---
category: Sensors
---

# onKeyStroke

监听键盘按键事件。

## 用法

```js
import { onKeyStroke } from '@vueuse/core'

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
})
```

请参阅[此表格](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)获取所有按键代码。

### 监听多个按键

```js
import { onKeyStroke } from '@vueuse/core'

onKeyStroke(['s', 'S', 'ArrowDown'], (e) => {
  e.preventDefault()
})

// 通过 [true / 略过键定义] 监听所有键
onKeyStroke(true, (e) => {
  e.preventDefault()
})
onKeyStroke((e) => {
  e.preventDefault()
})
```

### 自定义事件目标

```js
onKeyStroke('A', (e) => {
  console.log('按键 A 在文档上被按下')
}, { target: document })
```

### 忽略重复事件

当按下 `A` 键并保持按下时，回调函数只会触发一次。

```js
import { onKeyStroke } from '@vueuse/core'

// 使用 `autoRepeat` 选项
onKeyStroke('A', (e) => {
  console.log('按键 A 被按下')
}, { dedupe: true })
```

参考：[KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat)

## 指令用法

```vue
<script setup lang="ts">
import { vOnKeyStroke } from '@vueuse/components'

function onUpdate(e) {
  // 实现...
}
</script>

<template>
  <input v-on-key-stroke:c,v="onUpdate" type="text">
  <!-- 带有选项 -->
  <input v-on-key-stroke:c,v="[onUpdate, { eventName: 'keyup' }]" type="text">
</template>
```

### 自定义键盘事件

```js
onKeyStroke('Shift', (e) => {
  console.log('按键 Shift 松开')
}, { eventName: 'keyup' })
```

或者

```js
onKeyUp('Shift', () => console.log('按键 Shift 松开'))
```

## 快捷方式

- `onKeyDown` - `onKeyStroke(key, handler, {eventName: 'keydown'})` 的别名
- `onKeyPressed` - `onKeyStroke(key, handler, {eventName: 'keypress'})` 的别名
- `onKeyUp` - `onKeyStroke(key, handler, {eventName: 'keyup'})` 的别名
