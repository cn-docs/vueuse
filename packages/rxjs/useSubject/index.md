---
category: '@RxJS'
---

# useSubject

将 RxJS [`Subject`](https://rxjs.dev/guide/subject) 绑定到一个 `ref` 上，并在两者之间传播值变化。

## 用法

```ts
import { useSubject } from '@vueuse/rxjs'
import { Subject } from 'rxjs'

const subject = new Subject()

// setup()
const subjectRef = useSubject(subject)
```

如果您想要为可能出错的 Subject 添加自定义错误处理，您可以提供一个可选的 `onError` 配置。如果没有提供，RxJS 将把提供的 observable 中的任何错误视为"未处理的错误"，并且它将在一个新的调用栈中抛出，并报告给 `window.onerror`（或者如果您恰好在 Node 中，则为 `process.on('error')`）。

```ts
import { useSubject } from '@vueuse/rxjs'
import { Subject } from 'rxjs'

const subject = new Subject()

// setup()
const subjectRef = useSubject(subject, {
  onError: (err) => {
    console.log(err.message) // "oops"
  },
})
```
