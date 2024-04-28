---
category: Utilities
---

# useTimeoutPoll

使用超时来轮询某些内容。在最后一个任务完成后触发回调。

## 用法

```ts
import { useTimeoutPoll } from '@vueuse/core'

const count = ref(0)

async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  count.value++
}

// 仅在最后一个获取完成后触发
const { isActive, pause, resume } = useTimeoutPoll(fetchData, 1000)
```
