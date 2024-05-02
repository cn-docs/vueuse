---
category: '@Integrations'
---

# useAxios

对 [`axios`](https://github.com/axios/axios) 的封装。

## 安装

```bash
npm i axios@^1
```

## 用法

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

const { data, isFinished } = useAxios('/api/posts')
```

或者使用 axios 的实例

```ts
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({
  baseURL: '/api',
})

const { data, isFinished } = useAxios('/posts', instance)
```

使用带有配置选项的 axios 实例

```ts
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({
  baseURL: '/api',
})

const { data, isFinished } = useAxios('/posts', { method: 'POST' }, instance)
```

当您不传递 `url` 时，默认值是 `{ immediate: false }`

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

const { execute } = useAxios()
execute(url)
```

这里 `execute` 函数的 `url` 是可选的，并且 `url2` 将替换 `url1`。

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

const { execute } = useAxios(url1, {}, { immediate: false })
execute(url2)
```

`execute` 函数可以仅接受 `config`。

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

const { execute } = useAxios(url1, { method: 'GET' }, { immediate: false })
execute({ params: { key: 1 } })
execute({ params: { key: 2 } })
```

`execute` 函数返回网络请求的结果。

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

const { execute } = useAxios()
const result = await execute(url)
```

使用带有 `immediate` 选项的 axios 实例

```ts
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({
  baseURL: '/api',
})

const { data, isFinished } = useAxios('/posts', { method: 'POST' }, instance, {
  immediate: false,
})
```
