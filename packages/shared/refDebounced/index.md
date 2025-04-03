---
category: Reactivity
alias: useDebounce, debouncedRef
---

# refDebounced

对 ref 的更新进行防抖。

## 用法

```js {5}
import { refDebounced } from '@vueuse/core'
import { shallowRef } from 'vue'

const input = shallowRef('foo')
const debounced = refDebounced(input, 1000)

input.value = 'bar'
console.log(debounced.value) // 'foo'

await sleep(1100)

console.log(debounced.value) // 'bar'
```

你也可以传递一个可选的第三个参数，包括 `maxWait` 选项。详情请参阅 `useDebounceFn`。

## 推荐阅读

- [**防抖与节流**: 完整的可视化指南](https://redd.one/blog/debounce-vs-throttle)
