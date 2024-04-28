<script setup lang="ts">
import { stringify } from '@vueuse/docs-utils'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
const text = stringify(location)
</script>

<template>
  输入和哈希值将更改：
  <input v-model="location.hash" type="text" placeholder="Hash">
  <pre lang="yaml">{{ text }}</pre>
</template>
