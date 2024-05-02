---
category: '@Router'
---

# useRouteHash

对响应式的 `route.hash` 的简写。

## 用法

```ts
import { useRouteHash } from '@vueuse/router'

const search = useRouteHash()

console.log(search.value) // route.hash
search.value = 'foobar' // router.replace({ hash: 'foobar' })
```
