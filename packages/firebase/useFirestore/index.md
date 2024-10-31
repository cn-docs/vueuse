---
category: '@Firebase'
---

# useFirestore

响应式的 [Firestore](https://firebase.google.com/docs/firestore) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。

## 用法

```js {9,12,17,22}
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { computed, ref } from 'vue'

const app = initializeApp({ projectId: 'MY PROJECT ID' })
const db = getFirestore(app)

const todos = useFirestore(collection(db, 'todos'))

// 或者用于文档引用
const user = useFirestore(doc(db, 'users', 'my-user-id'))

// 您还可以使用 ref 值来创建响应式查询
const postsLimit = ref(10)
const postsQuery = computed(() => query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(postsLimit.value)))
const posts = useFirestore(postsQuery)

// 您可以使用布尔值告诉查询何时准备好运行
// 当它获取到假值时，返回初始值
const userId = ref('')
const userQuery = computed(() => userId.value && doc(db, 'users', userId.value))
const userData = useFirestore(userQuery, null)
```

## 在实例之间共享

您可以通过传递 `autoDispose: false` 来重用 db 引用。您还可以设置自动释放 db 引用之前的毫秒数。

注意：再次获取未释放的 db 引用不会产生 Firestore 读取成本。

```ts
const todos = useFirestore(collection(db, 'todos'), undefined, { autoDispose: false })
```

或者使用核心包中的 `createGlobalState`

```js
// store.js
import { createGlobalState } from '@vueuse/core'
import { useFirestore } from '@vueuse/firebase/useFirestore'

export const useTodos = createGlobalState(
  () => useFirestore(collection(db, 'todos')),
)
```

```js
// app.js
import { useTodos } from './store'

export default {
  setup() {
    const todos = useTodos()
    return { todos }
  },
}
```
