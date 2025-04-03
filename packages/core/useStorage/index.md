---
category: State
related: useLocalStorage, useSessionStorage, useStorageAsync
---

# useStorage

创建一个响应式的 ref，用于访问和修改 [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 或 [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)。

默认使用 localStorage，可以通过第三个参数指定其他存储源。

## 用法

::: tip
当与 Nuxt 3 一起使用时，此函数将**不会**自动导入，以支持 Nitro 内置的 [`useStorage()`](https://nitro.unjs.io/guide/storage)。如果你想使用 VueUse 中的函数，请显式导入。
:::

```js
import { useStorage } from '@vueuse/core'

// 绑定对象
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })

// 绑定布尔值
const flag = useStorage('my-flag', true) // 返回 Ref<boolean>

// 绑定数字
const count = useStorage('my-count', 0) // 返回 Ref<number>

// 使用 SessionStorage 绑定字符串
const id = useStorage('my-id', 'some-string-id', sessionStorage) // 返回 Ref<string>
// 从存储中删除数据
state.value = null
```

## 合并默认值

默认情况下，`useStorage` 会使用存储中的值（如果存在）并忽略默认值。请注意，当你向默认值添加更多属性时，如果客户端的存储中没有该键，则该键可能为 `undefined`。

```ts
localStorage.setItem('my-store', '{"hello": "hello"}')

const state = useStorage('my-store', { hello: 'hi', greeting: 'hello' }, localStorage)

console.log(state.value.greeting) // undefined，因为存储中没有这个值
```

要解决这个问题，你可以启用 `mergeDefaults` 选项。

```ts
localStorage.setItem('my-store', '{"hello": "nihao"}')

const state = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: true } // <--
)

console.log(state.value.hello) // 'nihao'，来自存储
console.log(state.value.greeting) // 'hello'，来自合并的默认值
```

当设置为 true 时，将对对象执行**浅合并**。你可以传递一个函数来执行自定义合并（例如深度合并），例如：

```ts
const state = useStorage(
  'my-store',
  { hello: 'hi', greeting: 'hello' },
  localStorage,
  { mergeDefaults: (storageValue, defaults) => deepMerge(defaults, storageValue) } // <--
)
```

## 自定义序列化

默认情况下，`useStorage` 会根据提供的默认值的数据类型智能地使用相应的序列化器。例如，对于对象使用 `JSON.stringify` / `JSON.parse`，对于数字使用 `Number.toString` / `parseFloat` 等。

你也可以为 `useStorage` 提供自己的序列化函数：

```ts
import { useStorage } from '@vueuse/core'

useStorage(
  'key',
  {},
  undefined,
  {
    serializer: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  },
)
```

请注意，当你提供 `null` 作为默认值时，`useStorage` 无法从中推断数据类型。在这种情况下，你可以提供自定义序列化器或显式重用内置的序列化器。

```ts
import { StorageSerializers, useStorage } from '@vueuse/core'

const objectLike = useStorage('key', null, undefined, { serializer: StorageSerializers.object })
objectLike.value = { foo: 'bar' }
```
