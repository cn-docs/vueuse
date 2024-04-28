---
category: State
related: useRefHistory
---

# useManualRefHistory

手动跟踪 ref 的变化历史，当使用者调用 `commit()` 时，也提供了撤销和重做功能。

## 使用方法

```ts {5}
import { ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'

const counter = ref(0)
const { history, commit, undo, redo } = useManualRefHistory(counter)

counter.value += 1
commit()

console.log(history.value)
/* [
  { snapshot: 1, timestamp: 1601912898062 },
  { snapshot: 0, timestamp: 1601912898061 }
] */
```

您可以使用 `undo` 将 ref 值重置为上一个历史点。

```ts
console.log(counter.value) // 1
undo()
console.log(counter.value) // 0
```

#### 可变对象的历史记录

如果您要修改源对象，则需要传递一个自定义克隆函数或将 `clone` 参数设置为 `true`，它是一个最小克隆函数 `x => JSON.parse(JSON.stringify(x))` 的快捷方式，它将在 `dump` 和 `parse` 中使用。

```ts {5}
import { ref } from 'vue'
import { useManualRefHistory } from '@vueuse/core'

const counter = ref({ foo: 1, bar: 2 })
const { history, commit, undo, redo } = useManualRefHistory(counter, { clone: true })

counter.value.foo += 1
commit()
```

#### 自定义克隆函数

要使用全功能或自定义克隆函数，您可以通过 `clone` 选项进行设置。

例如，使用 [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)：

```ts
import { useManualRefHistory } from '@vueuse/core'

const refHistory = useManualRefHistory(target, { clone: structuredClone })
```

或者使用 [lodash 的 `cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep)：

```ts
import { cloneDeep } from 'lodash-es'
import { useManualRefHistory } from '@vueuse/core'

const refHistory = useManualRefHistory(target, { clone: cloneDeep })
```

或者更轻量级的 [`klona`](https://github.com/lukeed/klona)：

```ts
import { klona } from 'klona'
import { useManualRefHistory } from '@vueuse/core'

const refHistory = useManualRefHistory(target, { clone: klona })
```

#### 自定义转储和解析函数

除了使用 `clone` 选项外，您还可以传递自定义函数来控制序列化和解析。如果您不需要历史值是对象，则在撤销时可以节省一个额外的克隆。如果您希望快照已经被字符串化以保存到本地存储中，这也很有用。

```ts
import { useManualRefHistory } from '@vueuse/core'

const refHistory = useManualRefHistory(target, {
  dump: JSON.stringify,
  parse: JSON.parse,
})
```

### 历史记录容量

默认情况下，我们会保留所有历史记录（无限制），直到您明确清除它们，您可以通过 `capacity` 选项设置要保留的最大历史记录数量。

```ts
const refHistory = useManualRefHistory(target, {
  capacity: 15, // 限制为 15 条历史记录
})

refHistory.clear() // 明确清除所有历史记录
```
