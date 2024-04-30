<script setup lang="ts">
import { useNow } from '@vueuse/core'

const now = useNow()
</script>

<template>
  <div>当前: {{ now }}</div>
</template>
