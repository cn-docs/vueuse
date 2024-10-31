---
category: '@Firebase'
---

# useRTDB

响应式的 [Firebase 实时数据库](https://firebase.google.com/docs/database) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。

## 用法

```js
import { useRTDB } from '@vueuse/firebase/useRTDB'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const app = initializeApp({ /* 配置 */ })
const db = getDatabase(app)

// 在 setup() 中
const todos = useRTDB(db.ref('todos'))
```

您可以通过传递 `autoDispose: false` 来重用 db 引用

```ts
const todos = useRTDB(db.ref('todos'), { autoDispose: false })
```

或者使用核心包中的 `createGlobalState`

```js
// store.js
import { createGlobalState } from '@vueuse/core'
import { useRTDB } from '@vueuse/firebase/useRTDB'

export const useTodos = createGlobalState(
  () => useRTDB(db.ref('todos')),
)
```

```js
// app.js
import { useTodos } from './store'

const todos = useTodos()
```
