---
category: Utilities
---

# createEventHook

用于创建事件钩子的实用工具

## 用法

创建一个使用 `createEventHook` 的函数

```ts
import { createEventHook } from '@vueuse/core'

export function useMyFetch(url) {
  const fetchResult = createEventHook<Response>()
  const fetchError = createEventHook<any>()

  fetch(url)
    .then(result => fetchResult.trigger(result))
    .catch(error => fetchError.trigger(error.message))

  return {
    onResult: fetchResult.on,
    onError: fetchError.on,
  }
}
```

使用一个使用 `createEventHook` 的函数

```vue
<script setup lang="ts">
import { useMyFetch } from './my-fetch-function'

const { onResult, onError } = useMyFetch('my api url')

onResult((result) => {
  console.log(result)
})

onError((error) => {
  console.error(error)
})
</script>
```
