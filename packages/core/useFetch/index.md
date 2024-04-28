---
category: Network
---

# useFetch

响应式的 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 提供了中止请求、在请求发送之前拦截请求、在 URL 变化时自动重新获取请求，并创建具有预定义选项的自定义 `useFetch` 的功能。

<CourseLink href="https://vueschool.io/lessons/vueuse-utilities-usefetch-and-reactify?friend=vueuse">通过 Vue School 免费视频课程学习 useFetch！</CourseLink>

::: tip
在 Nuxt 3 中使用时，为了支持 Nuxt 内置的 [`useFetch()`](https://v3.nuxtjs.org/api/composables/use-fetch)，该函数将**不会**自动导入。如果要使用 VueUse 中的函数，请明确导入。
:::

## 使用方法

### 基本用法

只需提供一个 URL，即可使用 `useFetch` 函数。URL 可以是字符串或 `ref`。`data` 对象将包含请求的结果，`error` 对象将包含任何错误，而 `isFetching` 对象将指示请求是否正在加载。

```ts
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = useFetch(url)
```

### 异步用法

`useFetch` 也可以像普通的 fetch 一样被等待。请注意，无论组件是否是异步的，使用它的组件都必须将组件包装在 `<Suspense>` 标签中。您可以在[官方 Vue 3 文档](https://vuejs.org/guide/built-ins/suspense.html)中了解有关 suspense API 的更多信息。

```ts
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = await useFetch(url)
```

### 在 URL 变化时重新获取

使用 `ref` 作为 URL 参数将允许 `useFetch` 函数在 URL 更改时自动触发另一个请求。

```ts
const url = ref('https://my-api.com/user/1')

const { data } = useFetch(url, { refetch: true })

url.value = 'https://my-api.com/user/2' // 将触发另一个请求
```

### 阻止立即触发请求

将 `immediate` 选项设置为 `false` 将阻止请求在调用 `execute` 函数之前触发。

```ts
const { execute } = useFetch(url, { immediate: false })

execute()
```

### 中止请求

可以使用 `useFetch` 函数的 `abort` 函数来中止请求。`canAbort` 属性指示是否可以中止请求。

```ts
const { abort, canAbort } = useFetch(url)

setTimeout(() => {
  if (canAbort.value)
    abort()
}, 100)
```

还可以通过使用 `timeout` 属性自动中止请求。当达到给定的超时时，它将调用 `abort` 函数。

```ts
const { data } = useFetch(url, { timeout: 100 })
```

### 拦截请求

`beforeFetch` 选项可以在发送请求之前拦截请求并修改请求选项和 URL。

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

`afterFetch` 选项可以在更新响应数据之前拦截响应数据。

```ts
const { data } = useFetch(url, {
  afterFetch(ctx) {
    if (ctx.data.title === 'HxH')
      ctx.data.title = 'Hunter x Hunter' // 修改响应数据

    return ctx
  },
})
```

`onFetchError` 选项可以在将 `updateDataOnError` 设置为 `true` 时拦截响应数据和错误，然后更新它们。

```ts
const { data } = useFetch(url, {
  updateDataOnError: true,
  onFetchError(ctx) {
    // 5xx 响应时，ctx.data 可能为 null
    if (ctx.data === null)
      ctx.data = { title: 'Hunter x Hunter' } // 修改响应数据

    ctx.error = new Error('Custom Error') // 修改错误
    return ctx
  },
})

console.log(data.value) // { title: 'Hunter x Hunter' }
```

### 设置请求方法和返回类型

可以通过在 `useFetch` 末尾添加相应的方法来设置请求方法和返回类型。

```ts
// 使用 GET 方法发送请求，并将数据解析为 JSON
const { data } = useFetch(url).get().json()

// 使用 POST 方法发送请求，并将数据解析为文本
const { data } = useFetch(url).post().text()

// 或使用选项设置方法

// 使用 GET 方法发送请求，并将数据解析为 Blob
const { data } = useFetch(url, { method: 'GET' }, { refetch: true }).blob()
```

### 创建自定义实例

`createFetch` 函数将返回一个带有预配置选项的 useFetch 函数。这对于在应用程序中与使用相同基本 URL 或需要授权头的 API 进行交互非常有用。

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

如果您希望在预配置的实例和新生成的实例之间控制 `beforeFetch`、`afterFetch`、`onFetchError` 的行为。您可以提供一个 `combination` 选项来在 `overwrite` 或 `chaining` 之间切换。

```ts
const useMyFetch = createFetch({
  baseUrl: 'https://my-api.com',
  combination: 'overwrite',
  options: {
    // 当新生成的实例没有通过 beforeFetch 时，预配置实例中的 beforeFetch 将会运行
    async beforeFetch({ options }) {
      const myToken = await getMyToken()
      options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
})

// 使用预配置的 beforeFetch
const { isFetching, error, data } = useMyFetch('users')

// 使用自定义 beforeFetch
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

### 事件

`onFetchResponse` 和 `onFetchError` 将分别在 fetch 请求的响应和错误时触发。

```ts
const { onFetchResponse, onFetchError } = useFetch(url)

onFetchResponse((response) => {
  console.log(response.status)
})

onFetchError((error) => {
  console.error(error.message)
})
```
