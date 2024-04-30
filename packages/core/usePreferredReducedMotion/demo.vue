<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'

const motion = usePreferredReducedMotion()
</script>

<template>
  <note class="mb-2">
    首选动作:
  </note>
  <code>{{ motion }}</code>
</template>
