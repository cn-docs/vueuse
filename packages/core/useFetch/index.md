---
category: Network
---

# useFetch

响应式 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 提供了中止请求、在请求发送前拦截请求、URL 变化时自动重新获取请求以及使用预定义选项创建你自己的 `useFetch` 的能力。

<CourseLink href="https://vueschool.io/lessons/vueuse-utilities-usefetch-and-reactify?friend=vueuse">通过 Vue School 的免费视频课程学习 useFetch！</CourseLink>

::: tip
与 Nuxt 3 一起使用时，此函数将**不会**被自动导入，以支持 Nuxt 内置的 [`useFetch()`](https://v3.nuxtjs.org/api/composables/use-fetch)。如果你想使用 VueUse 中的函数，请显式导入。
:::

## 用法

### 基本用法

`useFetch` 函数可以通过简单地提供一个 URL 来使用。URL 可以是字符串或 `ref`。`data` 对象将包含请求的结果，`error` 对象将包含任何错误，`isFetching` 对象将指示请求是否正在加载。

```ts
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = useFetch(url)
```

### 异步用法

`useFetch` 也可以像普通的 fetch 一样被 `await`。请注意，当一个组件是异步的时，任何使用它的组件都必须将该组件包装在一个 `<Suspense>` 标签中。你可以在 [Vue 3 官方文档](https://cn.vuejs.org/guide/built-ins/suspense.html)中阅读更多关于 suspense API 的信息。

```ts
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = await useFetch(url)
```

### URL 变化时重新获取

对 url 参数使用 `ref` 将允许 `useFetch` 函数在 url 更改时自动触发另一个请求。

```ts
const url = ref('https://my-api.com/user/1')

const { data } = useFetch(url, { refetch: true })

url.value = 'https://my-api.com/user/2' // 将触发另一个请求
```

### 阻止请求立即触发

将 `immediate` 选项设置为 `false` 将阻止请求在 `execute` 函数被调用之前触发。

```ts
const { execute } = useFetch(url, { immediate: false })

execute()
```

### 中止请求

可以使用 `useFetch` 函数中的 `abort` 函数中止请求。`canAbort` 属性指示请求是否可以中止。

```ts
const { abort, canAbort } = useFetch(url)

setTimeout(() => {
  if (canAbort.value)
    abort()
}, 100)
```

也可以通过使用 `timeout` 属性自动中止请求。当达到给定的超时时间时，它将调用 `abort` 函数。

```ts
const { data } = useFetch(url, { timeout: 100 })
```

### 拦截请求

`beforeFetch` 选项可以在请求发送前拦截它，并修改请求选项和 URL。

```ts
const { data } = useFetch(url, {
  async beforeFetch({ url, options, cancel }) {
    const myToken = await getMyToken()

    if (!myToken)
      cancel()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }

    return {
      options,
    }
  },
})
```

`afterFetch` 选项可以在响应数据更新前拦截它。

```ts
const { data } = useFetch(url, {
  afterFetch(ctx) {
    if (ctx.data.title === 'HxH')
      ctx.data.title = 'Hunter x Hunter' // 修改响应数据

    return ctx
  },
})
```

当 `updateDataOnError` 设置为 `true` 时，`onFetchError` 选项可以在响应数据和错误更新前拦截它们。

```ts
const { data } = useFetch(url, {
  updateDataOnError: true,
  onFetchError(ctx) {
    // 当出现 5xx 响应时，ctx.data 可能为 null
    if (ctx.data === null)
      ctx.data = { title: 'Hunter x Hunter' } // 修改响应数据

    ctx.error = new Error('自定义错误') // 修改错误
    return ctx
  },
})

console.log(data.value) // { title: 'Hunter x Hunter' }
```

### 设置请求方法和返回类型

可以通过在 `useFetch` 末尾添加适当的方法来设置请求方法和返回类型。

```ts
// 请求将以 GET 方法发送，数据将解析为 JSON
const { data } = useFetch(url).get().json()

// 请求将以 POST 方法发送，数据将解析为文本
const { data } = useFetch(url).post().text()

// 或者使用选项设置方法

// 请求将以 GET 方法发送，数据将解析为 blob
const { data } = useFetch(url, { method: 'GET' }, { refetch: true }).blob()
```

### 创建自定义实例

`createFetch` 函数将返回一个 `useFetch` 函数，其中包含提供给它的任何预配置选项。这对于在整个应用程序中与使用相同基本 URL 或需要授权标头的 API 进行交互非常有用。

```ts
const useMyFetch = createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    async beforeFetch({ options }) {
      const myToken = await getMyToken()
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const { isFetching, error, data } = useMyFetch('users')
```

如果你想控制预配置实例和新生成的实例之间的 `beforeFetch`、`afterFetch`、`onFetchError` 的行为，你可以提供一个 `combination` 选项来在 `overwrite` 或 `chaining` 之间切换。

```ts
const useMyFetch = createFetch({
  baseUrl: 'https://my-api.com',
  combination: 'overwrite', // 'overwrite' 或 'chaining'
  options: {
    // 仅当新生成的实例未传递 beforeFetch 时，预配置实例中的 beforeFetch 才会运行
    async beforeFetch({ options }) {
      const myToken = await getMyToken()
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
})

// 使用 useMyFetch 的 beforeFetch
const { isFetching, error, data } = useMyFetch('users')

// 使用自定义的 beforeFetch
const { isFetching, error, data } = useMyFetch('users', {
  async beforeFetch({ url, options, cancel }) {
    const myToken = await getMyToken()

    if (!myToken)
      cancel()

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${myToken}`,
    }

    return {
      options,
    }
  },
})
```

你可以通过在 `afterFetch` 或 `onFetchError` 中调用 `execute` 方法来重新执行请求。这是一个刷新令牌的简单示例：

```ts
let isRefreshing = false
const refreshSubscribers: Array<() => void> = []

const useMyFetch = createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    async beforeFetch({ options }) {
      const myToken = await getMyToken()
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
    afterFetch({ data, response, context, execute }) {
      if (needRefreshToken) { // 假设 needRefreshToken 是一个判断是否需要刷新 token 的条件
        if (!isRefreshing) {
          isRefreshing = true
          refreshToken().then((newToken) => {
            if (newToken.value) {
              isRefreshing = false
              setMyToken(newToken.value) // 假设 setMyToken 是设置新 token 的函数
              onRrefreshed()
            }
            else {
              refreshSubscribers.length = 0
              // 处理刷新 token 错误
            }
          })
        }

        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            execute().then((response) => {
              resolve({ data, response })
            })
          })
        })
      }

      return { data, response }
    },
    // 或者使用 onFetchError 和 updateDataOnError
    updateDataOnError: true,
    onFetchError({ error, data, response, context, execute }) {
      // 与 afterFetch 类似
      return { error, data }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

async function refreshToken() {
  const { data, execute } = useFetch<string>('refresh-token', { // 假设 'refresh-token' 是刷新 token 的接口
    immediate: false,
  })

  await execute()
  return data
}

function onRrefreshed() {
  refreshSubscribers.forEach(callback => callback())
  refreshSubscribers.length = 0
}

function addRefreshSubscriber(callback: () => void) {
  refreshSubscribers.push(callback)
}

const { isFetching, error, data } = useMyFetch('users')
```

### 事件

`onFetchResponse` 和 `onFetchError` 将分别在 fetch 请求响应和错误时触发。

```ts
const { onFetchResponse, onFetchError } = useFetch(url)

onFetchResponse((response) => {
  console.log(response.status)
})

onFetchError((error) => {
  console.error(error.message)
})
```
