---
category: Time
---

# useCountdown

`useIntervalFn` 的包装器，提供倒计时功能。

## 用法

```js
import { useCountdown } from '@vueuse/core'

const countdownSeconds = 5
const { remaining, start, stop, pause, resume } = useCountdown(countdownSeconds, {
  onComplete() {

  },
  onTick() {

  }
})
```

你可以使用 `ref` 来更改初始倒计时。
`start()` 和 `resume()` 也接受一个新的倒计时值用于下一次倒计时。

```js
import { shallowRef } from 'vue'
import { useCountdown } from '@vueuse/core'

const countdown = shallowRef(5)
const { start, reset } = useCountdown(countdown, {
})

// 更改倒计时值
countdown.value = 10

// 开始一个新的 2 秒倒计时
start(2)

// 重置倒计时为 4，但不开始
reset(4)

// 使用 `countdown` 的当前值开始倒计时
start()
```
