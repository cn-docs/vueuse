---
category: Reactivity
---

# extendRef

向 Ref 添加额外的属性。

## 用法

> 请注意，额外的属性在 Vue 的模板中不可访问。

```ts
import { extendRef } from '@vueuse/core'
import { shallowRef } from 'vue'

const myRef = shallowRef('content')

const extended = extendRef(myRef, { foo: 'extra data' })

extended.value === 'content'
extended.foo === 'extra data'
```

Refs 将被解包并保持响应式

```ts
const myRef = shallowRef('content')
const extraRef = shallowRef('extra')

const extended = extendRef(myRef, { extra: extraRef })

extended.value === 'content'
extended.extra === 'extra'

extended.extra = 'new data' // 将触发更新
extraRef.value === 'new data'
```
