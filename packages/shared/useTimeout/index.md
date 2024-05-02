---
category: Animation
---

# useTimeout

在一定时间后更新值，并带有控制功能。

## 使用方法

```js
import { promiseTimeout, useTimeout } from '@vueuse/core'

const ready = useTimeout(1000)
```

```js
const { ready, start, stop } = useTimeout(1000, { controls: true })
```

```js
console.log(ready.value) // false

await promiseTimeout(1200)

console.log(ready.value) // true
```
