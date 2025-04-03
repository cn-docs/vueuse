<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { shallowRef } from 'vue'

const input = shallowRef('')
const updated = shallowRef(0)

watchDebounced(input, () => {
  updated.value += 1
}, { debounce: 1000, maxWait: 5000 })
</script>

<template>
  <div>
    <input v-model="input" placeholder="尝试输入任何内容..." type="text">
    <note>此演示中延迟设置为 1000ms，最大等待时间设置为 5000ms。</note>

    <p>输入内容：{{ input }}</p>
    <p>更新次数：{{ updated }}</p>
  </div>
</template>
