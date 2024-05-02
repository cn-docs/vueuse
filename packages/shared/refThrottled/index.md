---
category: Reactivity
alias: useThrottle, throttledRef
---

# refThrottled

限制 ref 值的变化频率。

## 用法

```js
import { refThrottled } from '@vueuse/core'

const input = ref('')
const throttled = refThrottled(input, 1000)
```

### 尾部触发

如果你不想监听尾部的变化，可以设置第三个参数为 `false`（默认为 `true`）：

```js
import { refThrottled } from '@vueuse/core'

const input = ref('')
const throttled = refThrottled(input, 1000, false)
```

### 头部触发

允许回调函数立即被调用（在 `ms` 超时的头部）。如果你不想这种行为，可以将第四个参数设置为 `false`（默认为 `true`）：

```js
import { refThrottled } from '@vueuse/core'

const input = ref('')
const throttled = refThrottled(input, 1000, undefined, false)
```

## 推荐阅读

- [防抖和节流：图解指南](https://redd.one/blog/debounce-vs-throttle)
- [通过示例解释防抖和节流](https://css-tricks.com/debouncing-throttling-explained-examples/)
