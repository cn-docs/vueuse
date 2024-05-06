---
category: Watch
---

# until

等待变化的一次性 Promise

## 用法

#### 等待一些异步数据准备就绪

```js
import { until, useAsyncState } from '@vueuse/core'

const { state, isReady } = useAsyncState(
  fetch('https://jsonplaceholder.typicode.com/todos/1').then(t => t.json()),
  {},
)

;(async () => {
  await until(isReady).toBe(true)

  console.log(state) // 状态现在已经准备就绪！
})()
```

#### 等待自定义条件

> 您可以使用 `invoke` 调用异步函数。

```js
import { invoke, until, useCounter } from '@vueuse/core'

const { count } = useCounter()

invoke(async () => {
  await until(count).toMatch(v => v > 7)

  alert('计数器现在大于 7!')
})
```

#### 超时

```ts
// 将会在 ref.value === true 或者 1000ms 过去时解析
await until(ref).toBe(true, { timeout: 1000 })

// 如果超时将会抛出错误
try {
  await until(ref).toBe(true, { timeout: 1000, throwOnTimeout: true })
  // ref.value === true
}
catch (e) {
  // 超时
}
```

#### 更多示例

```ts
await until(ref).toBe(true)
await until(ref).toMatch(v => v > 10 && v < 100)
await until(ref).changed()
await until(ref).changedTimes(10)
await until(ref).toBeTruthy()
await until(ref).toBeNull()

await until(ref).not.toBeNull()
await until(ref).not.toBeTruthy()
```
