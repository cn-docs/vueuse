<script setup lang="ts">
import { useTimestamp } from '@vueuse/core'

const timestamp = useTimestamp()
</script>

<template>
  <div>时间戳: {{ timestamp }}</div>
</template>
