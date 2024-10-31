---
category: '@RxJS'
---

# useObservable

使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。

## 用法

```ts
import { useObservable } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { mapTo, scan, startWith } from 'rxjs/operators'
import { ref } from 'vue'

// setup()
const count = useObservable(
  interval(1000).pipe(
    mapTo(1),
    startWith(0),
    scan((total, next) => next + total),
  ),
)
```

如果您想要为可能出错的 `Observable` 添加自定义错误处理，您可以提供一个可选的 `onError` 配置。如果没有提供，RxJS 将把提供的 `Observable` 中的任何错误视为"未处理的错误"，并且它将在一个新的调用栈中抛出，并报告给 `window.onerror`（或者如果您恰好在 Node 中，则为 `process.on('error')`）。

```ts
import { useObservable } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { ref } from 'vue'

// setup()
const count = useObservable(
  interval(1000).pipe(
    map((n) => {
      if (n === 10)
        throw new Error('oops')

      return n + n
    }),
  ),
  {
    onError: (err) => {
      console.log(err.message) // "oops"
    },
  },
)
```
