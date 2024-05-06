---
category: Watch
alias: pausableWatch
---

# watchPausable

可暂停的 watch

## 使用方法

像正常使用 `watch` 一样，但返回额外的 `pause()` 和 `resume()` 函数以进行控制。

```typescript
import { watchPausable } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const source = ref('foo')

const { stop, pause, resume } = watchPausable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // 改变为 bar！

pause()

source.value = 'foobar'
await nextTick() // （没有发生变化）

resume()

source.value = 'hello'
await nextTick() // 改变为 hello！
```
