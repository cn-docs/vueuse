<script setup lang="ts">
import { useWindowFocus } from '@vueuse/core'
import { ref, watch } from 'vue'

const startMessage = '💡 单击文档外的任何地方取消焦点。'
const message = ref(startMessage)
const focused = useWindowFocus()

watch(focused, (isFocused) => {
  if (isFocused)
    message.value = startMessage
  else
    message.value = '标签页未聚焦'
})
</script>

<template>
  <div>{{ message }}</div>
</template>
