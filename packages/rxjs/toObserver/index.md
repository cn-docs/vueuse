---
category: '@RxJS'
---

# toObserver

将 `ref` 转换为 RxJS [Observer](https://rxjs.dev/guide/observer) 的语法糖函数。

## 用法

```ts
import { from, fromEvent, toObserver, useSubscription } from '@vueuse/rxjs'
import { interval } from 'rxjs'
import { map, mapTo, startWith, takeUntil, withLatestFrom } from 'rxjs/operators'
import { ref } from 'vue'

const count = ref(0)
const button = ref<HTMLButtonElement>(null)

useSubscription(
  interval(1000)
    .pipe(
      mapTo(1),
      takeUntil(fromEvent(button, 'click')),
      withLatestFrom(from(count).pipe(startWith(0))),
      map(([curr, total]) => curr + total),
    )
    .subscribe(toObserver(count)), // 等同于 ).subscribe(val => (count.value = val))
)
```
