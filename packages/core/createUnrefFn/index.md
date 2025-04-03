---
category: Utilities
related: reactify
---

# createUnrefFn

创建一个普通函数，接受 ref 和原始值作为参数。
返回与未转换函数返回相同的值，具有正确的类型。

::: tip
确保您使用的是正确的工具。在某些情况下，使用 `reactify` 可能更加合适，特别是当您希望在参数发生变化时重新评估函数时。
:::

## 用法

```ts
import { createUnrefFn } from '@vueuse/core'
import { shallowRef } from 'vue'

const url = shallowRef('https://httpbin.org/post')
const data = shallowRef({ foo: 'bar' })

function post(url, data) {
  return fetch(url, { data })
}
const unrefPost = createUnrefFn(post)

post(url, data) /* ❌ 将抛出错误，因为参数是 ref */
unrefPost(url, data) /* ✔️ 将正常工作，因为参数将自动解除引用 */
```
