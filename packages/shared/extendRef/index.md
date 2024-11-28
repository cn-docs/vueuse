---
category: 响应式
---

# extendRef

为 Ref 添加额外的属性。

## 使用方法

> 请注意，在 Vue 的模板中无法访问这些额外的属性。

```ts
import { extendRef } from '@vueuse/core'
import { ref } from 'vue'

const myRef = ref('content')

const extended = extendRef(myRef, { foo: 'extra data' })

extended.value === 'content'
extended.foo === 'extra data'
```

Refs 将被自动解包并保持响应式

```ts
const myRef = ref('content')
const extraRef = ref('extra')

const extended = extendRef(myRef, { extra: extraRef })

extended.value === 'content'
extended.extra === 'extra'

extended.extra = 'new data' // 将触发更新
extraRef.value === 'new data'
```
