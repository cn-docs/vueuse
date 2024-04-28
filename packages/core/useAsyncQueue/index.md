---
category: Utilities
---

# useAsyncQueue

依次执行每个异步任务，并将当前任务的结果传递给下一个任务

## 用法

```ts
import { useAsyncQueue } from '@vueuse/core'

function p1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000)
    }, 10)
  })
}

function p2(result: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000 + result)
    }, 20)
  })
}

const { activeIndex, result } = useAsyncQueue([p1, p2])

console.log(activeIndex.value) // 当前待处理任务的索引

console.log(result) // 任务结果
```
