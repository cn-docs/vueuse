<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { shallowRef } from 'vue'

const translateX = shallowRef(0)
const translateY = shallowRef(0)

onKeyStroke(['w', 'W', 'ArrowUp'], (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
  }
  translateY.value -= 10
})

onKeyStroke(['s', 'S', 'ArrowDown'], (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
  }
  translateY.value += 10
})

onKeyStroke(['a', 'A', 'ArrowLeft'], () => {
  translateX.value -= 10
})

onKeyStroke(['d', 'D', 'ArrowRight'], () => {
  translateX.value += 10
}, { dedupe: true })
</script>

<template>
  <div>
    <div class="container border-base">
      <div class="ball" :style="{ transform: `translate(${translateX}px, ${translateY}px)` }" />
    </div>
    <div class="text-center mt-4">
      <p>使用箭头键或 w a s d 键来控制球的移动。</p>
      <p>在按下键`d`或`->`时重复的事件将被忽略。</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 100px;
  margin: auto;
  overflow: hidden;
  border: 1px solid #a1a1a130;
  border-radius: 5px;
}

.ball {
  width: 16px;
  height: 16px;
  background: #a1a1a1;
  border-radius: 50%;
}
</style>
