---
category: Sensors
---

# useScrollLock

锁定元素的滚动。

## 用法

```vue
<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLElement>('el')
const isLocked = useScrollLock(el)

isLocked.value = true // 锁定
isLocked.value = false // 解锁
</script>

<template>
  <div ref="el" />
</template>
```

## 指令用法

```vue
<script setup lang="ts">
import { vScrollLock } from '@vueuse/components'
const data = ref([1, 2, 3, 4, 5, 6])
const isLocked = ref(false)
const toggleLock = useToggle(isLocked)
</script>

<template>
  <div v-scroll-lock="isLocked">
    <div v-for="item in data" :key="item">
      {{ item }}
    </div>
  </div>
  <button @click="toggleLock()">
    切换锁定状态
  </button>
</template>
```
