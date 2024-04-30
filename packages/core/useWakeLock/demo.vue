<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWakeLock } from '@vueuse/core'

const wakeLock = reactive(useWakeLock())
const text = computed(() => wakeLock.isActive ? 'OFF' : 'ON')
function onClick() {
  return wakeLock.isActive ? wakeLock.release() : wakeLock.request('screen')
}
</script>

<template>
  <div>
    是否支持: <BooleanDisplay :value="wakeLock.isSupported" />
  </div>
  <div>
    激活状态: <BooleanDisplay :value="wakeLock.isActive" />
  </div>
  <button @click="onClick">
    {{ text }}
  </button>
</template>
