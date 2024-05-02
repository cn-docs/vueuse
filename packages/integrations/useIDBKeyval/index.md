---
category: '@Integrations'
---

# useIDBKeyval

[`idb-keyval`](https://www.npmjs.com/package/idb-keyval) 的封装。

## 将 idb-keyval 安装为对等依赖项

```bash
npm install idb-keyval@^6
```

## 使用方法

```ts
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

// 绑定对象
const { data: storedObject, isFinished } = useIDBKeyval('my-idb-keyval-store', { hello: 'hi', greeting: 'Hello' })

// 更新对象
storedObject.value.hello = 'hola'

// 绑定布尔值
const flag = useIDBKeyval('my-flag', true) // 返回 Ref<boolean>

// 绑定数字
const count = useIDBKeyval('my-count', 0) // 返回 Ref<number>

// 等待 IDB 事务
await count.set(10)
console.log('IDB 事务完成！')

// 从 IDB 存储中删除数据
storedObject.value = null
```
