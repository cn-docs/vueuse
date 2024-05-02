---
category: Animation
---

# useInterval

在每个间隔上增加的响应式计数器

## 使用方法

```js {4}
import { useInterval } from '@vueuse/core'

// 每200ms计数增加一次
const counter = useInterval(200)
```

```ts
const { counter, reset, pause, resume } = useInterval(200, { controls: true })
```
