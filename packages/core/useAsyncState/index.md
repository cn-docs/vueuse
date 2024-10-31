---
category: State
---

# useAsyncState

响应式异步状态。不会阻塞你的设置函数，并且在 promise 准备就绪后会触发更改。状态默认为 `shallowRef`。

## 用法

```ts
import { useAsyncState } from '@vueuse/core'
import axios from 'axios'

const { state, isReady, isLoading } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(t => t.data),
  { id: null },
)
```
