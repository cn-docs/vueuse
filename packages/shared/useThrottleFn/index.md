---
category: Utilities
related: refThrottled, refDebounced, useDebounceFn
---

# useThrottleFn

节流执行函数。特别适用于限制事件处理程序在调整大小和滚动等事件上的执行频率。

> 节流就像一个弹簧，弹出一个小球后，它需要一些时间来收缩回去，所以除非准备好，否则不能再扔出更多的小球。

## 使用方法

```js
import { useThrottleFn } from '@vueuse/core'

const throttledFn = useThrottleFn(() => {
  // 做一些事情，它每秒最多被调用一次
}, 1000)

window.addEventListener('resize', throttledFn)
```

## 推荐阅读

- [**Debounce vs Throttle**: 明确的视觉指南](https://redd.one/blog/debounce-vs-throttle)
