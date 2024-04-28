---
category: Elements
---

# useElementVisibility

跟踪元素在视口内的可见性。

## 用法

```vue
<script setup>
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const target = ref(null)
const targetIsVisible = useElementVisibility(target)
</script>

<template>
  <div ref="target">
    <h1>Hello world</h1>
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseElementVisibility v-slot="{ isVisible }">
    是否可见：{{ isVisible }}
  </UseElementVisibility>
</template>
```

## 指令用法

```vue
<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'

const target = ref(null)
const isVisible = ref(false)

function onElementVisibility(state) {
  isVisible.value = state
}
</script>

<template>
  <div v-element-visibility="onElementVisibility">
    {{ isVisible ? '在内部' : '在外部' }}
  </div>

  <!-- 使用选项 -->
  <div ref="target">
    <div v-element-visibility="[onElementVisibility, { scrollTarget: target }]">
      {{ isVisible ? '在内部' : '在外部' }}
    </div>
  </div>
</template>
```
