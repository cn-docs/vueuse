<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'

const prefersDark = usePreferredDark()
</script>

<template>
  <note class="mb-2">
    喜欢深色:
  </note>
  <BooleanDisplay :value="prefersDark" />
</template>
