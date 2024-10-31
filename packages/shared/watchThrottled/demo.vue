<script setup lang="ts">
import { watchThrottled } from '@vueuse/core'
import { ref } from 'vue'

const input = ref('')
const updated = ref(0)

watchThrottled(input, () => {
  updated.value += 1
}, { throttle: 1000 })
</script>

<template>
  <div>
    <input v-model="input" placeholder="试着输入任何内容..." type="text">
    <note>延迟设置为1000毫秒以进行演示。</note>

    <p>输入内容: {{ input }}</p>
    <p>更新次数: {{ updated }}</p>
  </div>
</template>
