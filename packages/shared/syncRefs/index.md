---
category: Reactivity
related: syncRef
---

# syncRefs

将目标引用与源引用保持同步

## 用法

```ts
import { syncRefs } from '@vueuse/core'

const source = ref('hello')
const target = ref('target')

const stop = syncRefs(source, target)

console.log(target.value) // hello

source.value = 'foo'

console.log(target.value) // foo
```

### 与多个目标同步

您也可以传递一个引用数组来同步。

```ts
import { syncRefs } from '@vueuse/core'

const source = ref('hello')
const target1 = ref('target1')
const target2 = ref('target2')

const stop = syncRefs(source, [target1, target2])

console.log(target1.value) // hello
console.log(target2.value) // hello

source.value = 'foo'

console.log(target1.value) // foo
console.log(target2.value) // foo
```

## 监听选项

`syncRefs` 的选项类似于 `watch` 的 `WatchOptions`，但具有不同的默认值。

```ts
export interface SyncRefOptions {
  /**
   * 同步时机，与 watch 的 flush 选项相同
   *
   * @default 'sync'
   */
  flush?: WatchOptions['flush']
  /**
   * 深度监视
   *
   * @default false
   */
  deep?: boolean
  /**
   * 立即同步值
   *
   * @default true
   */
  immediate?: boolean
}
```

当设置 `{ flush: 'pre' }` 时，目标引用将在渲染开始之前的 [当前“tick”](https://cn.vuejs.org/guide/essentials/watchers#callback-flush-timing) 结束时更新。

```ts
import { syncRefs } from '@vueuse/core'

const source = ref('hello')
const target = ref('target')

syncRefs(source, target, { flush: 'pre' })

console.log(target.value) // hello

source.value = 'foo'

console.log(target.value) // hello <- 仍未更改，因为设置了 flush 'pre'

await nextTick()

console.log(target.value) // foo <- 已更改！
```
