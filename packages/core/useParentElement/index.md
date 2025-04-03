---
category: Elements
---

# useParentElement

获取给定元素的父元素

## 用法

当不传入参数时，它将返回当前组件的父元素。

```js
import { useParentElement } from '@vueuse/core'

const parentEl = useParentElement()

onMounted(() => {
  console.log(parentEl.value)
})
```

它也可以接受一个 `ref` 作为第一个参数。

```ts
import { useParentElement } from '@vueuse/core'
import { shallowRef } from 'vue'

// 别忘了将 ref 绑定到元素上
const tooltip = shallowRef<HTMLElement | undefined>()

const tooltipWrapper = useParentElement(tooltip)

onMounted(() => {
  console.log(tooltipWrapper.value)
})
```
