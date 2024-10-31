<script setup lang="ts">
import { refThrottled } from '@vueuse/core'
import { ref, watch } from 'vue'

const trailing = ref(true)
const leading = ref(false)
const input = ref('')
const throttled = refThrottled(input, 1000, trailing.value, leading.value)
const updated = ref(0)

watch(throttled, () => {
  updated.value += 1
})
</script>

<template>
  <div>
    <input v-model="input" placeholder="尝试输入任何内容..." type="text">
    <note>此演示设置了 1000 毫秒的延迟。</note>

    <p>节流后的值: {{ throttled }}</p>
    <p>更新次数: {{ updated }}</p>
    <p>尾部触发: {{ trailing }}</p>
    <p>头部触发: {{ leading }}</p>
  </div>
</template>
