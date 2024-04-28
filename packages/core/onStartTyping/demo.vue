<script setup lang="ts">
import { ref } from 'vue'
import { onStartTyping } from '@vueuse/core'

const input = ref<HTMLInputElement | null>(null)

onStartTyping(() => {
  if (input.value !== document.activeElement)
    input.value!.focus()
})
</script>

<template>
  <note>输入任何内容</note>
  <input ref="input" type="text" placeholder="Start typing to focus">
  <input type="text" placeholder="Start typing has no effect here">
</template>
