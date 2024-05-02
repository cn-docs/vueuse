---
category: Reactivity
---

# reactivePick

从响应式对象中动态地选择字段。

## 用法

### 基本用法

```ts
import { reactivePick } from '@vueuse/core'

const obj = reactive({
  x: 0,
  y: 0,
  elementX: 0,
  elementY: 0,
})

const picked = reactivePick(obj, 'x', 'elementX') // { x: number, elementX: number }
```

### 条件用法

```ts
import { reactivePick } from '@vueuse/core'

const source = reactive({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
  qux: true,
})
const state = reactivePick(source, (value, key) => key !== 'bar' && value !== true)
// { foo: string, baz: string }
source.qux = false
// { foo: string, baz: string, qux: boolean }
```

### 场景

#### 有选择地将属性传递给子组件

```vue
<script setup>
import { reactivePick } from '@vueuse/core'

const props = defineProps({
  value: {
    default: 'value',
  },
  color: {
    type: String,
  },
  font: {
    type: String,
  }
})

const childProps = reactivePick(props, 'color', 'font')
</script>

<template>
  <div>
    <!-- 只将 "color" 和 "font" 属性传递给子组件 -->
    <ChildComp v-bind="childProps" />
  </div>
</template>
```

#### 有选择地包装响应式对象

不再需要这样做

```ts
import { reactive } from 'vue'
import { useElementBounding } from '@vueuse/core'

const { height, width } = useElementBounding() // object of refs
const size = reactive({ height, width })
```

现在我们可以简单地这样做

```ts
import { reactivePick, useElementBounding } from '@vueuse/core'

const size = reactivePick(useElementBounding(), 'height', 'width')
```
