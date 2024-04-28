<script setup lang="ts">
import { useCurrentElement } from '@vueuse/core'
import { watchEffect } from 'vue'

const el = useCurrentElement()

watchEffect(() => {
  console.log('Current element:', el.value)
})
</script>

<template>
  <div>打开console.log查看元素</div>
</template>
