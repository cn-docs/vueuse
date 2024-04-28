---
category: Sensors
---

# useKeyModifier

响应式地跟踪[修饰键状态](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)。跟踪任何[支持的修饰键](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#browser_compatibility)的状态 - 请参阅浏览器兼容性说明。

<CourseLink href="https://vueschool.io/lessons/alt-drag-to-clone-tasks?friend=vueuse">通过 Vue School 的这个免费视频课程来学习 useKeyModifier！</CourseLink>

## 使用方法

```ts
import { useKeyModifier } from '@vueuse/core'

const capsLockState = useKeyModifier('CapsLock')

console.log(capsLockState.value)
```

## 事件

您可以自定义哪些事件将触发状态更新。默认情况下，这些事件是 `mouseup`、`mousedown`、`keyup`、`keydown`。要自定义这些事件：

```ts
import { useKeyModifier } from '@vueuse/core'

const capsLockState = useKeyModifier('CapsLock', { events: ['mouseup', 'mousedown'] })

console.log(capsLockState) // null

// 通过按键开启大写锁定
console.log(capsLockState) // null

// 鼠标按钮被点击
console.log(capsLockState) // true
```

## 初始状态

默认情况下，返回的 ref 将是 `Ref<boolean | null>`，直到收到第一个事件为止。您可以通过以下方式明确地将初始状态传递给它：

```ts
const capsLockState1 = useKeyModifier('CapsLock') // Ref<boolean | null>
const capsLockState2 = useKeyModifier('CapsLock', { initial: false }) // Ref<boolean>
```
