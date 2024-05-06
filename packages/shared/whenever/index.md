---
category: Watch
---

# whenever

监视值为真的简写形式。

## 用法

```javascript
import { useAsyncState, whenever } from '@vueuse/core'

const { state, isReady } = useAsyncState(
  fetch('https://jsonplaceholder.typicode.com/todos/1').then(t => t.json()),
  {},
)

whenever(isReady, () => console.log(state))
```

```typescript
// 这个
whenever(ready, () => console.log(state))

// 等同于:
watch(ready, (isReady) => {
  if (isReady)
    console.log(state)
})
```

### 回调函数

与 `watch` 相同，回调函数将使用 `cb(value, oldValue, onInvalidate)` 调用。

```typescript
whenever(height, (current, lastHeight) => {
  if (current > lastHeight)
    console.log(`高度增加了 ${current - lastHeight}`)
})
```

### 计算属性

与 `watch` 相同，您可以传递一个获取器函数来在每次更改时计算。

```typescript
// 这个
whenever(
  () => counter.value === 7,
  () => console.log('counter 现在为 7!'),
)
```

### 选项

选项和默认值与 `watch` 相同。

```typescript
// 这个
whenever(
  () => counter.value === 7,
  () => console.log('counter 现在为 7!'),
  { flush: 'sync' },
)
```
