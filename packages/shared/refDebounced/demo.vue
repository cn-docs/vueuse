<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { shallowRef, watch } from 'vue'

const input = shallowRef('')
const debounced = refDebounced(input, 1000)
const updated = shallowRef(0)

watch(debounced, () => (updated.value += 1))
</script>

<template>
  <div>
    <input v-model="input" placeholder="尝试输入任何内容..." type="text">
    <note>此演示设置了 1000ms 的延迟。</note>

    <p>Debounced: {{ debounced }}</p>
    <p>更新次数: {{ updated }}</p>
  </div>
</template>
