---
category: Watch
---

# watchTriggerable

可手动触发的 Watch

## 用法

`watch` 的一个包装器，支持手动触发 `WatchCallback`，返回一个额外的 `trigger` 来立即执行 `WatchCallback`。

```typescript
import { watchTriggerable } from '@vueuse/core'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef(0)

const { trigger, ignoreUpdates } = watchTriggerable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // logs: Changed to bar!

// 通过 `trigger` 执行 WatchCallback 不需要等待
trigger() // logs: Changed to bar!
```

### `onCleanup`

当您想手动调用使用 onCleanup 参数的 `watch` 时；简单地将 `WatchCallback` 拿出来调用并不容易实现 `onCleanup` 参数。

使用 `watchTriggerable` 将解决此问题。

```typescript
import { watchTriggerable } from '@vueuse/core'
import { shallowRef } from 'vue'

const source = shallowRef(0)

const { trigger } = watchTriggerable(
  source,
  async (v, _, onCleanup) => {
    let canceled = false
    onCleanup(() => canceled = true)

    await new Promise(resolve => setTimeout(resolve, 500))
    if (canceled)
      return

    console.log(`The value is "${v}"\n`)
  },
)

source.value = 1 // no log
await trigger() // logs (after 500 ms): The value is "1"
```
