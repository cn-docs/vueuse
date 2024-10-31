---
category: Animation
---

# useTransition

值之间的过渡效果

## 用法

定义一个数值型的源值，当其改变时，输出值会过渡到新值。如果源值在过渡进行中发生变化，则会从中断处开始新的过渡。

```js
import { TransitionPresets, useTransition } from '@vueuse/core'
import { ref } from 'vue'

const source = ref(0)

const output = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})
```

为了同步过渡，可以使用数字数组。以下是一个在颜色之间过渡的示例。

```js
const source = ref([0, 0, 0])

const output = useTransition(source)

const color = computed(() => {
  const [r, g, b] = output.value
  return `rgb(${r}, ${g}, ${b})`
})
```

可以使用三次贝塞尔曲线自定义过渡缓动。以与 [CSS 缓动函数](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#easing_functions) 相同的方式定义过渡。

```js
useTransition(source, {
  transition: [0.75, 0, 0.25, 1],
})
```

通过 `TransitionPresets` 常量可使用以下过渡效果：

- [`linear`](https://cubic-bezier.com/#0,0,1,1)
- [`easeInSine`](https://cubic-bezier.com/#.12,0,.39,0)
- [`easeOutSine`](https://cubic-bezier.com/#.61,1,.88,1)
- [`easeInOutSine`](https://cubic-bezier.com/#.37,0,.63,1)
- [`easeInQuad`](https://cubic-bezier.com/#.11,0,.5,0)
- [`easeOutQuad`](https://cubic-bezier.com/#.5,1,.89,1)
- [`easeInOutQuad`](https://cubic-bezier.com/#.45,0,.55,1)
- [`easeInCubic`](https://cubic-bezier.com/#.32,0,.67,0)
- [`easeOutCubic`](https://cubic-bezier.com/#.33,1,.68,1)
- [`easeInOutCubic`](https://cubic-bezier.com/#.65,0,.35,1)
- [`easeInQuart`](https://cubic-bezier.com/#.5,0,.75,0)
- [`easeOutQuart`](https://cubic-bezier.com/#.25,1,.5,1)
- [`easeInOutQuart`](https://cubic-bezier.com/#.76,0,.24,1)
- [`easeInQuint`](https://cubic-bezier.com/#.64,0,.78,0)
- [`easeOutQuint`](https://cubic-bezier.com/#.22,1,.36,1)
- [`easeInOutQuint`](https://cubic-bezier.com/#.83,0,.17,1)
- [`easeInExpo`](https://cubic-bezier.com/#.7,0,.84,0)
- [`easeOutExpo`](https://cubic-bezier.com/#.16,1,.3,1)
- [`easeInOutExpo`](https://cubic-bezier.com/#.87,0,.13,1)
- [`easeInCirc`](https://cubic-bezier.com/#.55,0,1,.45)
- [`easeOutCirc`](https://cubic-bezier.com/#0,.55,.45,1)
- [`easeInOutCirc`](https://cubic-bezier.com/#.85,0,.15,1)
- [`easeInBack`](https://cubic-bezier.com/#.36,0,.66,-.56)
- [`easeOutBack`](https://cubic-bezier.com/#.34,1.56,.64,1)
- [`easeInOutBack`](https://cubic-bezier.com/#.68,-.6,.32,1.6)

对于更复杂的过渡效果，可以提供自定义函数。

```js
function easeOutElastic(n) {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : (2 ** (-10 * n)) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}

useTransition(source, {
  transition: easeOutElastic,
})
```

要控制过渡何时开始，设置 `delay` 值。要围绕过渡效果协调行为，请定义 `onStarted` 或 `onFinished` 回调函数。

```js
useTransition(source, {
  delay: 1000,
  onStarted() {
    // 过渡开始后调用
  },
  onFinished() {
    // 过渡结束后调用
  },
})
```

要暂时停止过渡，定义一个布尔型 `disabled` 属性。请注意，这与 `duration` 为 `0` 不同。禁用过渡会**同步**跟踪源值。它们不会遵循 `delay`，也不会触发 `onStarted` 或 `onFinished` 回调函数。

要更精确地控制，可以使用 `executeTransition` 手动执行过渡。此函数返回一个在完成后解析的 promise。手动过渡可以通过定义一个返回真值的 `abort` 函数来取消。

```js
import { executeTransition } from '@vueuse/core'

await executeTransition(source, from, to, {
  duration: 1000,
})
```
