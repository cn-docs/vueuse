---
category: Sensors
---

# useFocusWithin

用于跟踪一个元素或其子元素是否具有焦点的响应式工具。它的行为类似于 `:focus-within` CSS 伪类。一个常见的用例是在表单元素上，以查看其任何输入框当前是否具有焦点。

## 基本用法

```vue
<script>
import { useFocusWithin } from '@vueuse/core'
import { ref, watch } from 'vue'

const target = ref()
const { focused } = useFocusWithin(target)

watch(focused, (focused) => {
  if (focused)
    console.log('目标包含有焦点的元素')
  else console.log('目标不包含有焦点的元素')
})
</script>

<template>
  <form ref="target">
    <input type="text" placeholder="名">
    <input type="text" placeholder="姓">
    <input type="text" placeholder="电子邮件">
    <input type="text" placeholder="密码">
  </form>
</template>
```
