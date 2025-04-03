---
category: '@Math'
---

# useClamp

在两个其他值之间响应式地夹取一个值。

## 用法

```ts
import { useClamp } from '@vueuse/math'

const min = shallowRef(0)
const max = shallowRef(10)
const value = useClamp(0, min, max)
```

你也可以传递一个 `ref`，当源 `ref` 发生变化时，返回的 `computed` 将会被更新：

```ts
import { useClamp } from '@vueuse/math'

const number = shallowRef(0)
const clamped = useClamp(number, 0, 10)
```
