<script setup lang="ts">
import { useTimeout } from '@vueuse/core'

const { ready, start } = useTimeout(1000, { controls: true })
</script>

<template>
  <div>
    <p>准备就绪：{{ ready.toString() }}</p>
    <button :disabled="!ready" @click="start()">
      重新开始
    </button>
  </div>
</template>
