---
category: '@Router'
---

# useRouteQuery

对响应式的 `route.query` 的简写。

## 用法

```ts
import { useRouteQuery } from '@vueuse/router'

const search = useRouteQuery('search')

const search = useRouteQuery('search', 'foo') // 或者带有默认值

const page = useRouteQuery('page', '1', { transform: Number }) // 或者进行值转换

console.log(search.value) // route.query.search
search.value = 'foobar' // router.replace({ query: { search: 'foobar' } })
```
