---
category: Sensors
---

# useFocus

用于跟踪或设置 DOM 元素的焦点状态的响应式工具。状态变化反映了目标元素是否为焦点元素。从外部设置响应式值将触发对应于 `true` 和 `false` 值的 `focus` 和 `blur` 事件。

## 基本用法

```ts
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target)

watch(focused, (focused) => {
  if (focused)
    console.log('输入元素已获取焦点')
  else console.log('输入元素已失去焦点')
})
```

## 设置初始焦点

可以通过将 `initialValue` 选项设置为 `true` 来在首次渲染时让元素获得焦点。这将触发目标元素上的 `focus` 事件。

```ts
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target, { initialValue: true })
```

## 更改焦点状态

`focused` 响应式引用的更改将自动触发对应于 `true` 和 `false` 值的 `focus` 和 `blur` 事件。您可以利用这种行为来作为其他操作的结果使目标元素获得焦点（例如，当按钮被点击时，如下所示）。

```vue
<script>
import { useFocus } from '@vueuse/core'
import { ref } from 'vue'

export default {
  setup() {
    const input = ref()
    const { focused } = useFocus(input)

    return {
      input,
      focused,
    }
  },
}
</script>

<template>
  <div>
    <button type="button" @click="focused = true">
      单击我以使下面的输入框获得焦点
    </button>
    <input ref="input" type="text">
  </div>
</template>
```
