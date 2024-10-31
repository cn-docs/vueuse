---
category: '@RxJS'
---

# useExtractedObservable

从一个或多个组合式中提取并使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。

在可观察对象发生变化时自动取消订阅，并在组件卸载时自动取消订阅。

支持与 [`watch`](https://cn.vuejs.org/guide/essentials/watchers#basic-example) 的所有重载签名匹配的签名。

## 用法

```ts
import { useExtractedObservable } from '@vueuse/rxjs'
import ObservableSocket from 'observable-socket'
import { computed } from 'vue'
import { makeSocket, useUser } from '../some/lib/func'

// setup()
const user = useUser()
const lastMessage = useExtractedObservable(user, u => ObservableSocket.create(makeSocket(u.id)).down)
```

如果您想要为可能出错的 `Observable` 添加自定义错误处理，您可以提供一个可选的 `onError` 配置。如果没有提供，RxJS 将把提供的 `Observable` 中的任何错误视为"未处理的错误"，并且它将在一个新的调用栈中抛出，并报告给 `window.onerror`（或者如果您恰好在 Node 中，则为 `process.on('error')`）。

```ts
import { useExtractedObservable } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith, tap } from 'rxjs/operators'
import { ref } from 'vue'

// setup()
const start = ref(0)

const count = useExtractedObservable(
  start,
  (start) => {
    return interval(1000).pipe(
      mapTo(1),
      startWith(start),
      scan((total, next) => next + total),
      tap((n) => {
        if (n === 10)
          throw new Error('oops')
      })
    )
  },
  {
    onError: (err) => {
      console.log(err.message) // "oops"
    },
  }
)
```

如果需要，在观察的可观察对象完成时附加特殊行为，您还可以提供一个可选的 `onComplete` 配置。

```ts
import { useExtractedObservable } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith, takeWhile } from 'rxjs/operators'
import { ref } from 'vue'

// setup()
const start = ref(0)

const count = useExtractedObservable(
  start,
  (start) => {
    return interval(1000).pipe(
      mapTo(1),
      startWith(start),
      scan((total, next) => next + total),
      takeWhile(num => num < 10)
    )
  },
  {
    onComplete: () => {
      console.log('Done!')
    },
  }
)
```

如果需要，您还可以将 `watch` 选项作为最后一个参数传递：

```ts
import { useExtractedObservable } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith, takeWhile } from 'rxjs/operators'
import { ref } from 'vue'

// setup()
const start = ref<number>()

const count = useExtractedObservable(
  start,
  (start) => {
    return interval(1000).pipe(
      mapTo(1),
      startWith(start),
      scan((total, next) => next + total),
      takeWhile(num => num < 10)
    )
  },
  {},
  {
    immediate: false
  }
)
```
