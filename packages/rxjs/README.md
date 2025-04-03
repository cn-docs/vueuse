# @vueuse/rxjs

[![NPM version](https://img.shields.io/npm/v/@vueuse/rxjs?color=a1b858)](https://www.npmjs.com/package/@vueuse/rxjs)

> This is an add-on of [VueUse](https://github.com/antfu), enabling a natural way of using RxJS.

## Install

```bash
npm i @vueuse/rxjs rxjs
```

## Functions

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--FUNCTIONS_LIST_STARTS-->

- [`from`](https://vueuse.org/rxjs/from/) — rxJS 的 [`from()`](https://rxjs.dev/api/index/function/from) 和 [`fromEvent()`](https://rxjs.dev/api/index/function/fromEvent) 的包装器，使它们能够接受 `ref`。
- [`toObserver`](https://vueuse.org/rxjs/toObserver/) — 将 `ref` 转换为 RxJS [Observer](https://rxjs.dev/guide/observer) 的语法糖函数。
- [`useExtractedObservable`](https://vueuse.org/rxjs/useExtractedObservable/) — 从一个或多个组合式中提取并使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。
- [`useObservable`](https://vueuse.org/rxjs/useObservable/) — 使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。
- [`useSubject`](https://vueuse.org/rxjs/useSubject/) — 将 RxJS [`Subject`](https://rxjs.dev/guide/subject) 绑定到一个 `ref` 上，并在两者之间传播值变化。
- [`useSubscription`](https://vueuse.org/rxjs/useSubscription/) — 使用 RxJS [`Subscription`](https://rxjs.dev/guide/subscription)，无需担心取消订阅或创建内存泄漏。
- [`watchExtractedObservable`](https://vueuse.org/rxjs/watchExtractedObservable/) — 监视从一个或多个组合式中提取的 RxJS [`Observable`](https://rxjs.dev/guide/observable) 的值。

<!--FUNCTIONS_LIST_ENDS-->

## Example

```ts
import { from, fromEvent, useObservable } from '@vueuse/rxjs'
import { forkJoin, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { concatAll, map, mergeMap, pluck, scan, take } from 'rxjs/operators'
import { ref } from 'vue'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const button = ref<HTMLButtonElement>(null)

const posts = useObservable(
  fromEvent(button, 'click').pipe(
    mergeMap(() => ajax.getJSON(`${BASE_URL}/posts`).pipe(
      concatAll(),
      take(4),
      mergeMap(({ id, userId, title }) => forkJoin({
        id: of(id),
        comments: ajax.getJSON(`${BASE_URL}/posts/${id}/comments`).pipe(
          map(comments => comments.length),
        ),
        username: ajax.getJSON(`${BASE_URL}/users/${userId}`).pipe(
          pluck('username'),
        ),
      }), 2),
      scan((acc, curr) => [...acc, curr], []),
    )),
  ),
)
```

## License

[MIT License](https://github.com/vueuse/vueuse/blob/master/LICENSE) © 2019-PRESENT [Anthony Fu](https://github.com/antfu)
