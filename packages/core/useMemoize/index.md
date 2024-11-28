---
category: Utilities
---

# useMemoize

根据参数缓存函数结果并保持其响应性。它也可以用于异步函数，并且会重用现有的 Promise 以避免同时获取相同的数据。

::: tip
结果不会自动清除。如果你不再需要这些结果，请调用 `clear()`，或者使用自己的缓存机制来避免内存泄漏。
:::

## 使用方法

```ts
import { useMemoize } from '@vueuse/core'

const getUser = useMemoize(
  async (userId: number): Promise<UserData> =>
    axios.get(`users/${userId}`).then(({ data }) => data),
)

const user1 = await getUser(1) // 请求 users/1
const user2 = await getUser(2) // 请求 users/2
// ...
const user1 = await getUser(1) // 从缓存中获取

// ...
const user1 = await getUser.load(1) // 请求 users/1

// ...
getUser.delete(1) // 删除用户1的缓存
getUser.clear() // 清除所有缓存
```

与 `computed` 或 `asyncComputed` 结合使用以实现响应性：

```ts
const user1 = asyncComputed(() => getUser(1))
// ...
await getUser.load(1) // 同时会更新 user1
```

### 解析缓存键

缓存的键由传递给函数的参数决定，默认情况下会使用 `JSON.stringify` 进行序列化。
这将允许相等的对象获得相同的缓存键。如果你想自定义键，可以传入 `getKey`

```ts
const getUser = useMemoize(
  async (userId: number, headers: AxiosRequestHeaders): Promise<UserData> =>
    axios.get(`users/${userId}`, { headers }).then(({ data }) => data),
  {
    // 仅使用 userId 来获取/设置缓存，忽略 headers
    getKey: (userId, headers) => userId,
  },
)
```

### 自定义缓存机制

默认情况下，结果被缓存在一个 `Map` 中。你可以通过在选项中传入具有以下结构的 `cache` 来实现自己的机制：

```ts
export interface MemoizeCache<Key, Value> {
  /**
   * 获取键对应的值
   */
  get: (key: Key) => Value | undefined
  /**
   * 设置键对应的值
   */
  set: (key: Key, value: Value) => void
  /**
   * 返回键是否存在的标志
   */
  has: (key: Key) => boolean
  /**
   * 删除键对应的值
   */
  delete: (key: Key) => void
  /**
   * 清除缓存
   */
  clear: () => void
}
```
