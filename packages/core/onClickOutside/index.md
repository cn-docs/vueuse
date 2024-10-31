---
category: Sensors
---

# onClickOutside

监听元素外的点击事件。适用于模态框或下拉菜单等场景。

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

> 此函数使用 [Event.composedPath()](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) ，不支持 IE 11、Edge 18 及以下版本。如果您的目标是这些浏览器，请在项目中包含 [此代码片段](https://gist.github.com/sibbng/13e83b1dd1b733317ce0130ef07d4efd)。

## 组件用法

```vue
<template>
  <OnClickOutside :options="{ ignore: [/* ... */] }" @trigger="count++">
    <div>
      点击我外面
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

您还可以将处理程序设置为数组，以设置指令的配置项。

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
