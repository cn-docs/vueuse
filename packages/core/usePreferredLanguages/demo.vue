<script setup lang="ts">
import { usePreferredLanguages } from '@vueuse/core'

const languages = usePreferredLanguages()
</script>

<template>
  <note class="mb-2">
    首选语言：
  </note>
  <div>
    <code v-for="lang in languages" :key="lang" class="mr-2">{{ lang }}</code>
  </div>
</template>
