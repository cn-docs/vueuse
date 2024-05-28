---
category: Component
---

# useCurrentElement

将当前组件的 DOM 元素作为 ref 返回。

## 用法

```ts
import { useCurrentElement } from '@vueuse/core'

const el = useCurrentElement() // ComputedRef<Element>
```

或者传递一个特定的 Vue 组件

```vue
<script setup>
import { ref } from 'vue'
import { useCurrentElement } from '@vueuse/core'

const componentRef = ref()

const el = useCurrentElement(componentRef) // ComputedRef<Element>
</script>

<template>
  <div>
    <OtherVueComponent ref="componentRef" />
    <p>Hello world</p>
  </div>
</template>
```

::: info
仅适用于 Vue 3，因为它在底层使用了 [computedWithControl](https://vueuse.org/shared/computedWithControl/#manual-triggering)
:::

## 注意事项

此函数在底层使用 [`$el`](https://cn.vuejs.org/api/component-instance#el)。

在组件挂载之前，ref 的值将为 `undefined`。

- 对于具有单个根元素的组件，它将指向该元素。
- 对于具有文本根的组件，它将指向文本节点。
- 对于具有多个根节点的组件，它将是 Vue 用于跟踪组件在 DOM 中位置的占位符 DOM 节点。

建议仅对具有 **单个根元素** 的组件使用此函数。
