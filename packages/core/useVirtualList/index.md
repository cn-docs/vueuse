---
category: Component
---

# useVirtualList

::: warning
如果您正在寻找更多功能，请考虑使用 [`vue-virtual-scroller`](https://github.com/Akryum/vue-virtual-scroller)。
:::

轻松创建虚拟列表。虚拟列表（有时称为 [_virtual scrollers_](https://vue-virtual-scroller-demo.netlify.app/)）允许您高效地渲染大量项目。它们只渲染必要的最小数量的 DOM 节点，以通过使用 `wrapper` 元素模拟容器元素的完整高度来显示 `container` 元素中的项目。

## 用法

### 简单列表

```typescript
import { useVirtualList } from '@vueuse/core'

const { list, containerProps, wrapperProps } = useVirtualList(
  Array.from(Array.from({ length: 99999 }).keys()),
  {
    // 确保 `itemHeight` 与每行的高度保持同步。
    itemHeight: 22,
  },
)
```

### 配置

| 状态       | 类型     | 描述                                                            |
| ---------- | -------- | --------------------------------------------------------------- |
| itemHeight | `number` | 确保正确计算 `wrapper` 元素的总高度。\*                         |
| itemWidth  | `number` | 确保正确计算 `wrapper` 元素的总宽度。\*                         |
| overscan   | `number` | 预渲染的 DOM 节点数量。如果您快速滚动，可防止项目之间出现空白。 |

\* 必须将 `itemHeight` 或 `itemWidth` 与呈现的每行的高度保持同步。如果在滚动到列表底部时看到额外的空白或抖动，请确保 `itemHeight` 或 `itemWidth` 与行的高度相同。

### 响应式列表

```typescript
import { useToggle, useVirtualList } from '@vueuse/core'
import { computed } from 'vue'

const [isEven, toggle] = useToggle()
const allItems = Array.from(Array.from({ length: 99999 }).keys())
const filteredList = computed(() => allItems.filter(i => isEven.value ? i % 2 === 0 : i % 2 === 1))

const { list, containerProps, wrapperProps } = useVirtualList(
  filteredList,
  {
    itemHeight: 22,
  },
)
```

```vue
<template>
  <p>显示 {{ isEven ? '偶数' : '奇数' }} 项目</p>
  <button @click="toggle">
    切换 偶数/奇数
  </button>
  <div v-bind="containerProps" style="height: 300px">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="height: 22px">
        Row: {{ item.data }}
      </div>
    </div>
  </div>
</template>
```

### 水平列表

```typescript
import { useVirtualList } from '@vueuse/core'

const allItems = Array.from(Array.from({ length: 99999 }).keys())

const { list, containerProps, wrapperProps } = useVirtualList(
  allItems,
  {
    itemWidth: 200,
  },
)
```

```vue
<template>
  <div v-bind="containerProps" style="height: 300px">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" style="width: 200px">
        Row: {{ item.data }}
      </div>
    </div>
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseVirtualList :list="list" :options="options" height="300px">
    <template #default="props">
      <!-- 在这里获取列表的当前项目 -->
      <div style="height: 22px">
        Row {{ props.index }} {{ props.data }}
      </div>
    </template>
  </UseVirtualList>
</template>
```

要滚动到特定元素，组件提供了 `scrollTo(index: number) => void` 方法。
