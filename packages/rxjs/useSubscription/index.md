---
category: '@RxJS'
---

# useSubscription

使用 RxJS [`Subscription`](https://rxjs.dev/guide/subscription)，无需担心取消订阅或创建内存泄漏。

## 用法

```ts
import { useSubscription } from '@vueuse/rxjs'
import { interval } from 'rxjs'

const count = ref(0)

// 在组件卸载前调用 unsubscribe 方法
useSubscription(
  interval(1000)
    .subscribe(() => {
      count.value++
      console.log(count)
    }),
)
```
