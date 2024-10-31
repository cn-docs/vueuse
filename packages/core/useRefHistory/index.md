---
category: State
related: useManualRefHistory
---

# useRefHistory

跟踪 ref 的变化历史，还提供了撤销和重做功能。

<CourseLink href="https://vueschool.io/lessons/ref-history-with-vueuse?friend=vueuse">通过 Vue School 的免费视频课程了解 useRefHistory！</CourseLink>

## 用法

```ts {5}
import { useRefHistory } from '@vueuse/core'
import { ref } from 'vue'

const counter = ref(0)
const { history, undo, redo } = useRefHistory(counter)
```

在内部，使用 `watch` 来触发历史记录点，当 ref 的值被修改时。这意味着历史记录点是异步触发的，将相同的修改批处理在同一“时刻”内。

```ts
counter.value += 1

await nextTick()
console.log(history.value)
/* [
  { snapshot: 1, timestamp: 1601912898062 },
  { snapshot: 0, timestamp: 1601912898061 }
] */
```

您可以使用 `undo` 将 ref 的值重置为上一个历史记录点。

```ts
console.log(counter.value) // 1
undo()
console.log(counter.value) // 0
```

### 对象 / 数组

当使用对象或数组时，由于更改它们的属性不会更改引用，因此不会触发提交。要跟踪属性更改，您需要传递 `deep: true`。它将为每个历史记录创建克隆。

```ts
const state = ref({
  foo: 1,
  bar: 'bar',
})

const { history, undo, redo } = useRefHistory(state, {
  deep: true,
})

state.value.foo = 2

await nextTick()
console.log(history.value)
/* [
  { snapshot: { foo: 2, bar: 'bar' } },
  { snapshot: { foo: 1, bar: 'bar' } }
] */
```

#### 自定义克隆函数

`useRefHistory` 仅嵌入了最小的克隆函数 `x => JSON.parse(JSON.stringify(x))`。要使用全功能或自定义克隆函数，您可以通过 `clone` 选项进行设置。

例如，使用 [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)：

```ts
import { useRefHistory } from '@vueuse/core'

const refHistory = useRefHistory(target, { clone: structuredClone })
```

或使用 [lodash 的 `cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep)：

```ts
import { useRefHistory } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'

const refHistory = useRefHistory(target, { clone: cloneDeep })
```

或更轻量级的 [`klona`](https://github.com/lukeed/klona)：

```ts
import { useRefHistory } from '@vueuse/core'
import { klona } from 'klona'

const refHistory = useRefHistory(target, { clone: klona })
```

#### 自定义转储和解析函数

您可以传递自定义函数来控制序列化和解析，而不是使用 `clone` 选项。如果您不需要历史值是对象，这可以在撤销时节省一个额外的克隆。如果您希望快照已经被字符串化以便例如保存到本地存储，这也很有用。

```ts
import { useRefHistory } from '@vueuse/core'

const refHistory = useRefHistory(target, {
  dump: JSON.stringify,
  parse: JSON.parse,
})
```

### 历史记录容量

默认情况下，我们会保留所有的历史记录（无限），直到您明确清除它们，您可以通过 `capacity` 选项设置要保留的历史记录的最大数量。

```ts
const refHistory = useRefHistory(target, {
  capacity: 15, // 限制为 15 条历史记录
})

refHistory.clear() // 明确清除所有的历史记录
```

### 历史记录刷新时机

来自 [Vue 文档](https://cn.vuejs.org/guide/essentials/watchers#callback-flush-timing)：Vue 的响应性系统会缓冲失效的效果并异步刷新它们，以避免在同一“时刻”发生许多状态突变时不必要的重复调用。

与 `watch` 类似，您可以使用 `flush` 选项修改刷新时机。

```ts
const refHistory = useRefHistory(target, {
  flush: 'sync', // 选项 'pre'（默认），'post' 和 'sync'
})
```

默认值是 `'pre'`，以使此组合与 Vue 观察器的默认值保持一致。这也有助于避免常见问题，比如在同一“时刻”内作为 ref 值多步更新的一部分生成了几个历史记录点，这可能会破坏应用程序状态的不变性。如果需要在同一“时刻”内创建多个历史记录点，则可以使用 `commit()`。

```ts
const r = ref(0)
const { history, commit } = useRefHistory(r)

r.value = 1
commit()

r.value = 2
commit()

console.log(history.value)
/* [
  { snapshot: 2 },
  { snapshot: 1 },
  { snapshot: 0 },
] */
```

另一方面，当使用 `flush: 'sync'` 时，您可以使用 `batch(fn)` 为多个同步操作生成单个历史记录点。

```ts
const r = ref({ names: [], version: 1 })
const { history, batch } = useRefHistory(r, { flush: 'sync' })

batch(() => {
  r.value.names.push('Lena')
  r.value.version++
})

console.log(history.value)
/* [
  { snapshot: { names: [ 'Lena' ], version: 2 },
  { snapshot: { names: [], version: 1 },
] */
```

如果使用了 `{ flush: 'sync', deep: true }`，`batch` 在对数组进行可变的 `splice` 时也很有用。`splice` 可以生成最多三个原子操作，这些操作将被推送到 ref 历史记录中。

```ts
const arr = ref([1, 2, 3])
const { history, batch } = useRefHistory(arr, { deep: true, flush: 'sync' })

batch(() => {
  arr.value.splice(1, 1) // batch 确保只生成一个历史记录点
})
```

另一个选项是避免直接改变原始的 ref 值，而是使用 `arr.value = [...arr.value].splice(1,1)`。

## 推荐阅读

- [历史记录与持久性](https://patak.dev/vue/history-and-persistence.html) - 由 [@matias-capeletto](https://github.com/matias-capeletto)
