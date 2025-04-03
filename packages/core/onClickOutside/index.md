---
category: Sensors
---

# onClickOutside

监听元素外部的点击。适用于模态框或下拉菜单。

## 用法

```vue
<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const target = ref(null)

onClickOutside(target, event => console.log(event))
</script>

<template>
  <div ref="target">
    Hello world
  </div>
  <div>外部元素</div>
</template>
```

## 组件用法

```vue
<template>
  <OnClickOutside :options="{ ignore: [/* ... */] }" @trigger="count++">
    <div>
      点击我外部
    </div>
  </OnClickOutside>
</template>
```

## 指令用法

```vue
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'

const modal = ref(false)
function closeModal() {
  modal.value = false
}
</script>

<template>
  <button @click="modal = true">
    打开模态框
  </button>
  <div v-if="modal" v-on-click-outside="closeModal">
    Hello World
  </div>
</template>
```

你也可以将处理程序设置为数组来设置指令的配置项。

```vue
<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'

const modal = ref(false)

const ignoreElRef = ref()

const onClickOutsideHandler = [
  (ev) => {
    console.log(ev)
    modal.value = false
  },
  { ignore: [ignoreElRef] },
]
</script>

<template>
  <button @click="modal = true">
    打开模态框
  </button>

  <div ref="ignoreElRef">
    点击外部忽略元素
  </div>

  <div v-if="modal" v-on-click-outside="onClickOutsideHandler">
    Hello World
  </div>
</template>
```
