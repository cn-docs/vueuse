---
category: Reactivity
---

# extendRef

向 Ref 添加额外属性。

::: warning
此函数仅适用于 Vue 2.7 或以上版本。
:::

## 用法

> 请注意，额外属性将无法在 Vue 的模板中访问。

```ts
import { ref } from 'vue'
import { extendRef } from '@vueuse/core'

const myRef = ref('content')

const extended = extendRef(myRef, { foo: 'extra data' })

extended.value === 'content'
extended.foo === '额外数据'
```

Refs 将被解封装并具有响应性

```ts
const myRef = ref('content')
const extraRef = ref('extra')

const extended = extendRef(myRef, { extra: extraRef })

extended.value === 'content'
extended.extra === 'extra'

extended.extra = 'new data' // 将触发更新
extraRef.value === 'new data'
```
