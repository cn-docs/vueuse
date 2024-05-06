---
category: Watch
alias: ignorableWatch
---

# watchIgnorable

可忽略的监听器

## 使用方法

扩展了 `watch`，返回额外的 `ignoreUpdates(updater)` 和 `ignorePrevAsyncUpdates()`，用于忽略特定于源的更新。

```ts
import { watchIgnorable } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const source = ref('foo')

const { stop, ignoreUpdates } = watchIgnorable(
  source,
  v => console.log(`更改为 ${v}！`),
)

source.value = 'bar'
await nextTick() // 日志: 更改为 bar!

ignoreUpdates(() => {
  source.value = 'foobar'
})
await nextTick() // (没有任何变化)

source.value = 'hello'
await nextTick() // 日志: 更改为 hello!

ignoreUpdates(() => {
  source.value = 'ignored'
})
source.value = 'logged'

await nextTick() // 日志: 更改为 logged!
```

## 刷新时机

`watchIgnorable` 接受与 `watch` 相同的选项，并使用相同的默认值。
因此，默认情况下，组合函数使用 `flush: 'pre'`。

## `ignorePrevAsyncUpdates`

此功能仅适用于异步刷新 `'pre'` 和 `'post'`。如果使用了 `flush: 'sync'`，则 `ignorePrevAsyncUpdates()` 不起作用，因为在对源进行每次更新后，监听将立即触发。仍然为同步刷新提供此功能，以便代码可以更通用。

```ts
import { watchIgnorable } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const source = ref('foo')

const { ignorePrevAsyncUpdates } = watchIgnorable(
  source,
  v => console.log(`更改为 ${v}！`),
)

source.value = 'bar'
await nextTick() // 日志: 更改为 bar!

source.value = 'good'
source.value = 'by'
ignorePrevAsyncUpdates()

await nextTick() // (没有任何变化)

source.value = 'prev'
ignorePrevAsyncUpdates()
source.value = 'after'

await nextTick() // 日志: 更改为 after!
```

## 推荐阅读

- [可忽略的监听器](https://patak.dev/vue/ignorable-watch.html) - 作者：[@matias-capeletto](https://github.com/matias-capeletto)
