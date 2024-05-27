<script setup lang="ts">
import { ref } from 'vue'
import { onLongPress } from './'

const htmlRef = ref<HTMLElement | null>(null)
const htmlRefOptions = ref<HTMLElement | null>(null)
const htmlRefOnMouseUp = ref<HTMLElement | null>(null)

const longPressed = ref(false)
const clicked = ref(false)

function onLongPressCallback(e: PointerEvent) {
  longPressed.value = true
}

function onMouseUpCallback(duration: number, distance: number, isLongPress: boolean) {
  if (!isLongPress)
    clicked.value = true

  console.log({ distance, duration, isLongPress })
}

function reset() {
  longPressed.value = false
  clicked.value = false
}

onLongPress(htmlRef, onLongPressCallback)
onLongPress(htmlRefOptions, onLongPressCallback, { delay: 1000 })
onLongPress(
  htmlRefOnMouseUp,
  onLongPressCallback,
  {
    distanceThreshold: 24,
    delay: 1000,
    onMouseUp: onMouseUpCallback,
  },
)
</script>

<template>
  <p>长按： <BooleanDisplay :value="longPressed" /></p>
  <p>点击： <BooleanDisplay :value="clicked" /></p>
  <button ref="htmlRef" class="ml-2 button small">
    长按（500毫秒）
  </button>
  <button ref="htmlRefOptions" class="ml-2 button small">
    长按（1000毫秒）
  </button>
  <button ref="htmlRefOnMouseUp" class="ml-2 button small">
    长按（1000毫秒）或点击
  </button>
  <button class="ml-2 button small" @click="reset">
    重置
  </button>
</template>
