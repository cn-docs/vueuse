<script setup lang="ts">
import { invoke, until, useCounter } from '@vueuse/shared'

const { count, inc, dec } = useCounter()

invoke(async () => {
  await until(count).toBe(7)

  alert('你获得了7!')
})
</script>

<template>
  <note>将计数增加到 7 以显示警报。</note>
  <p>计数: {{ count }}</p>
  <button @click="inc()">
    增加
  </button>
  <button @click="dec()">
    减少
  </button>
</template>
