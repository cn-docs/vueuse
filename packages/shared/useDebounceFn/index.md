---
category: Utilities
related: useThrottleFn
---

# useDebounceFn

延迟执行函数。

> 延迟是一个被过载的服务员：如果你不停地问他问题，直到你停下来并给他一些时间来考虑你最新的问题，他将会忽略你的请求。

## 使用方法

```js
import { useDebounceFn } from '@vueuse/core'

const debouncedFn = useDebounceFn(() => {
  // 做一些事情
}, 1000)

window.addEventListener('resize', debouncedFn)
```

你还可以传递第三个参数给它，带有一个最大等待时间，类似于 [lodash debounce](https://lodash.com/docs/4.17.15#debounce)

```js
import { useDebounceFn } from '@vueuse/core'

// 如果在重复输入后 5000ms 内没有调用，该函数将被调用。
const debouncedFn = useDebounceFn(() => {
  // 做一些事情
}, 1000, { maxWait: 5000 })

window.addEventListener('resize', debouncedFn)
```

此外，你可以使用 promise 操作获取函数的返回值。

```js
import { useDebounceFn } from '@vueuse/core'

const debouncedRequest = useDebounceFn(() => 'response', 1000)

debouncedRequest().then((value) => {
  console.log(value) // 'response'
})

// 或者使用 async/await
async function doRequest() {
  const value = await debouncedRequest()
  console.log(value) // 'response'
}
```

由于未处理的拒绝错误在开发者不需要返回值时相当烦人，promise 在**默认情况下**如果函数被取消，则**不会**被拒绝。你需要指定选项 `rejectOnCancel: true` 来捕获拒绝。

```js
import { useDebounceFn } from '@vueuse/core'

const debouncedRequest = useDebounceFn(() => 'response', 1000, { rejectOnCancel: true })

debouncedRequest()
  .then((value) => {
    // 做一些事情
  })
  .catch(() => {
    // 在被取消时做一些事情
  })

// 再次调用将取消前一个请求并被拒绝
setTimeout(debouncedRequest, 500)
```

## 推荐阅读

- [**Debounce vs Throttle**: 明确的视觉指南](https://redd.one/blog/debounce-vs-throttle)
