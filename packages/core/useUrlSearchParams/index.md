---
category: Browser
---

# useUrlSearchParams

响应式 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## 用法

```js
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')

console.log(params.foo) // 'bar'

params.foo = 'bar'
params.vueuse = 'awesome'
// URL 更新为 `?foo=bar&vueuse=awesome`
```

### 哈希模式

当在哈希模式路由中使用时，将 `mode` 设置为 `hash`

```js
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('hash')

params.foo = 'bar'
params.vueuse = 'awesome'
// URL 更新为 `#/your/route?foo=bar&vueuse=awesome`
```

### 哈希参数

当在历史模式路由中使用，但想要使用哈希作为参数时，将 `mode` 设置为 `hash-params`

```js
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('hash-params')

params.foo = 'bar'
params.vueuse = 'awesome'
// URL 更新为 `/your/route#foo=bar&vueuse=awesome`
```
