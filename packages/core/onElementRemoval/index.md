---
category: Sensors
---

# onElementRemoval

当元素或其包含元素被移除时触发。

## 用法

```vue {13}
<script setup lang="ts">
import { onElementRemoval } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'

const btnRef = useTemplateRef<HTMLElement>('btn')
const btnState = shallowRef(true)
const removedCount = shallowRef(0)

function btnOnClick() {
  btnState.value = !btnState.value
}

onElementRemoval(btnRef, () => ++removedCount.value)
</script>

<template>
  <button
    v-if="btnState"
    @click="btnOnClick"
  >
    重新创建我
  </button>
  <button
    v-else
    ref="btnRef"
    @click="btnOnClick"
  >
    移除我
  </button>
  <b>移除次数: {{ removedCount }}</b>
</template>
```
