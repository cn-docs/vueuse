---
category: Watch
alias: ignorableWatch
---

# watchIgnorable

可忽略的 watch

## 用法

扩展的 `watch`，返回额外的 `ignoreUpdates(updater)` 和 `ignorePrevAsyncUpdates()` 来忽略特定的源更新。

```ts
import { watchIgnorable } from '@vueuse/core'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { stop, ignoreUpdates } = watchIgnorable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // 输出: Changed to bar!

ignoreUpdates(() => {
  source.value = 'foobar'
})
await nextTick() // (没有任何输出)

source.value = 'hello'
await nextTick() // 输出: Changed to hello!

ignoreUpdates(() => {
  source.value = 'ignored'
})
source.value = 'logged'

await nextTick() // 输出: Changed to logged!
```

## 刷新时机

`watchIgnorable` 接受与 `watch` 相同的选项并使用相同的默认值。
因此，默认情况下该组合式函数使用 `flush: 'pre'`。

## `ignorePrevAsyncUpdates`

此功能仅适用于异步刷新 `'pre'` 和 `'post'`。如果使用 `flush: 'sync'`，`ignorePrevAsyncUpdates()` 将不起作用，因为 watch 会在每次源更新后立即触发。它仍然为同步刷新提供，以便代码可以更通用。

```ts
import { watchIgnorable } from '@vueuse/core'
import { nextTick, shallowRef } from 'vue'

const source = shallowRef('foo')

const { ignorePrevAsyncUpdates } = watchIgnorable(
  source,
  v => console.log(`Changed to ${v}!`),
)

source.value = 'bar'
await nextTick() // 输出: Changed to bar!

source.value = 'good'
source.value = 'by'
ignorePrevAsyncUpdates()

await nextTick() // (没有任何输出)

source.value = 'prev'
ignorePrevAsyncUpdates()
source.value = 'after'

await nextTick() // 输出: Changed to after!
```

## 推荐阅读

- [Ignorable Watch](https://patak.dev/vue/ignorable-watch.html) - 作者 [@patak-dev](https://github.com/patak-dev)
