<script setup lang="ts">
import { computedEager } from '@vueuse/core'
import { onUpdated } from 'vue-demi'
import { count } from './state'

const emit = defineEmits(['update'])
onUpdated(() => emit('update'))

const isOver5 = computedEager(() => count.value > 5)
</script>

<template>
  <div>
    已超过5: <BooleanDisplay :value="isOver5" />
  </div>
</template>
