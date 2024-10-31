---
category: Sensors
---

# onLongPress

监听元素上的长按事件。

函数在选项中提供了修饰符

- stop
- once
- prevent
- capture
- self

## 用法

```vue
<script setup lang="ts">
import { onLongPress } from '@vueuse/core'
import { ref } from 'vue'

const htmlRefHook = ref<HTMLElement>()
const longPressedHook = ref(false)

function onLongPressCallbackHook(e: PointerEvent) {
  longPressedHook.value = true
}
function resetHook() {
  longPressedHook.value = false
}

onLongPress(
  htmlRefHook,
  onLongPressCallbackHook,
  {
    modifiers: {
      prevent: true
    }
  }
)
</script>

<template>
  <p>长按状态：{{ longPressedHook }}</p>

  <button ref="htmlRefHook" class="ml-2 button small">
    长按
  </button>

  <button class="ml-2 button small" @click="resetHook">
    重置
  </button>
</template>
```

## 组件用法

```vue
<script setup lang="ts">
import { OnLongPress } from '@vueuse/components'
import { ref } from 'vue'

const longPressedComponent = ref(false)

function onLongPressCallbackComponent(e: PointerEvent) {
  longPressedComponent.value = true
}
function resetComponent() {
  longPressedComponent.value = false
}
</script>

<template>
  <p>长按状态：{{ longPressedComponent }}</p>

  <OnLongPress
    as="button"
    class="ml-2 button small"
    @trigger="onLongPressCallbackComponent"
  >
    长按
  </OnLongPress>

  <button class="ml-2 button small" @click="resetComponent">
    重置
  </button>
</template>
```

## 指令用法

```vue
<script setup lang="ts">
import { vOnLongPress } from '@vueuse/components'
import { ref } from 'vue'

const longPressedDirective = ref(false)

function onLongPressCallbackDirective(e: PointerEvent) {
  longPressedDirective.value = true
}
function resetDirective() {
  longPressedDirective.value = false
}
</script>

<template>
  <p>长按状态：{{ longPressedDirective }}</p>

  <button
    v-on-long-press.prevent="onLongPressCallbackDirective"
    class="ml-2 button small"
  >
    长按
  </button>

  <button
    v-on-long-press="[onLongPressCallbackDirective, { delay: 1000, modifiers: { stop: true } }]"
    class="ml-2 button small"
  >
    长按（带选项）
  </button>

  <button class="ml-2 button small" @click="resetDirective">
    重置
  </button>
</template>
```
