<script setup lang="ts">
import { usePreferredContrast } from '@vueuse/core'

const contrast = usePreferredContrast()
</script>

<template>
  <note class="mb-2">
    首选对比度:
  </note>
  <code>{{ contrast }}</code>
</template>
