<script setup lang="ts">
import { useOnline } from '@vueuse/core'
import { computed } from 'vue'

const online = useOnline()

const clazz = computed(() => online.value ? 'text-primary' : 'text-gray')
const text = computed(() => online.value ? 'Online' : 'Offline')
</script>

<template>
  <note class="mb-2">
    请断开网络查看更改
  </note>
  <div>状态：<b :class="clazz">{{ text }}</b></div>
</template>
