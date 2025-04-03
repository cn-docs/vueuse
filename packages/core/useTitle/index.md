---
category: Browser
---

# useTitle

响应式的文档标题。

::: warning
此组合式函数与 SSR 不兼容。
:::

## 用法

```js
import { useTitle } from '@vueuse/core'

const title = useTitle()
console.log(title.value) // 打印当前标题
title.value = 'Hello' // 更改当前标题
```

立即设置初始标题：

```js
const title = useTitle('新标题')
```

传递一个 `ref`，当源 ref 更改时标题将更新：

```js
import { useTitle } from '@vueuse/core'

const messages = ref(0)

const title = computed(() => {
  return !messages.value ? '没有消息' : `${messages.value} 条新消息`
})

useTitle(title) // 文档标题将与 ref "title" 匹配
```

传递一个可选的模板标签 [Vue Meta Title Template](https://vue-meta.nuxtjs.org/guide/metainfo.html) 以更新要注入到此模板中的标题：

```js
const title = useTitle('新标题', { titleTemplate: '%s | 我的精彩网站' })
```

::: warning
`observe` 与 `titleTemplate` 不兼容。
:::
