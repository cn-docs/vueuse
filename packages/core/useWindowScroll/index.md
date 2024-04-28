---
category: Elements
---

# useWindowScroll

响应式窗口滚动

## 用法

```js
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll()
console.log(x.value) // 读取当前的 x 滚动值
y.value = 100 // 将 y 滚动到 100
```
