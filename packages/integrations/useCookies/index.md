---
category: '@Integrations'
---

# useCookies

对 [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) 的包装。

::: tip
在 Nuxt 3 中使用时，这些函数不会自动导入，而是使用 Nuxt 内置的 [`useCookie()`](https://v3.nuxtjs.org/api/composables/use-cookie)。如果要使用 VueUse 中的函数，请显式导入。
:::

## 安装

```bash
npm i universal-cookie@^6
```

## 用法

### 常规用法

```vue
<script>
import { defineComponent } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

export default defineComponent({
  setup() {
    const cookies = useCookies(['locale'])
    return {
      cookies,
    }
  },
})
</script>

<template>
  <div>
    <strong>locale</strong>: {{ cookies.get('locale') }}
    <hr>
    <pre>{{ cookies.getAll() }}</pre>
    <button @click="cookies.set('locale', 'ru-RU')">
      Russian
    </button>
    <button @click="cookies.set('locale', 'en-US')">
      English
    </button>
  </div>
</template>
```

## 选项

使用 vue composition-api 访问和修改 cookie。

> 默认情况下，应该在 `setup()` 中使用它，但此函数也可以在其他任何地方使用。

```ts
const { get, getAll, set, remove, addChangeListener, removeChangeListener } = useCookies(['cookie-name'], { doNotParse: false, autoUpdateDependencies: false })
```

### `dependencies`（可选）

允许您可选地指定组件依赖的或应触发重新渲染的 cookie 名称列表。如果未指定，它将在每次 cookie 更改时重新渲染。

### `options`（可选）

- `doNotParse`（布尔值 = false）：无论如何都不将 cookie 转换为对象。**作为传递给 `get`/`getAll` 方法的默认值。**
- `autoUpdateDependencies`（布尔值 = false）：自动添加传递给 `get` 方法的 cookie 名称。如果为 **true**，则无需关心提供的 `dependencies`。

### `cookies`（可选）

允许您提供一个 `universal-cookie` 实例（默认情况下创建一个新实例）

> 关于可用方法的信息，请参阅 [universal-cookie api 文档](https://www.npmjs.com/package/universal-cookie#api---cookies-class)

## `createCookies([req])`

使用请求创建一个 `universal-cookie` 实例（默认是 window.document.cookie），并返回带有提供的 `universal-cookie` 实例的 `useCookies` 函数

- req（对象）：Node 的 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 请求对象
