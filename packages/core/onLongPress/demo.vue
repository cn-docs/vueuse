<script setup lang="ts">
import { ref } from 'vue'
import { onLongPress } from '@vueuse/core'

const htmlRef = ref<HTMLElement | null>(null)
const htmlRefOptions = ref<HTMLElement | null>(null)

const longPressed = ref(false)

function onLongPressCallback(e: PointerEvent) {
  longPressed.value = true
}

function reset() {
  longPressed.value = false
}

onLongPress(htmlRef, onLongPressCallback)
onLongPress(htmlRefOptions, onLongPressCallback, { delay: 1000 })
</script>

<template>
  <p>长按状态: <BooleanDisplay :value="longPressed" /></p>
  <button ref="htmlRef" class="ml-2 button small">
    长按（500毫秒）
  </button>
  <button ref="htmlRefOptions" class="ml-2 button small">
    长按（1000毫秒）
  </button>
  <button class="ml-2 button small" @click="reset">
    重置
  </button>
</template>
