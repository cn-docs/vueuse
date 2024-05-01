<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'

const { textarea, input } = useTextareaAutosize()
</script>

<template>
  <div>
    <span>输入内容，文本框会自动增长：</span>
    <textarea
      ref="textarea"
      v-model="input"
      class="resize-none"
      placeholder="你在想什么？"
    />
  </div>
</template>
