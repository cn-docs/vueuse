---
category: '@Router'
---

# useRouteParams

对响应式的 `route.params` 的简写。

## 用法

```ts
import { useRouteParams } from '@vueuse/router'

const userId = useRouteParams('userId')

const userId = useRouteParams('userId', '-1') // 或者带有默认值

const userId = useRouteParams('page', '1', { transform: Number }) // 或者进行值转换

console.log(userId.value) // route.params.userId
userId.value = '100' // router.replace({ params: { userId: '100' } })
```
