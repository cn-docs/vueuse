<script setup lang="ts">
import { useWakeLock } from '@vueuse/core'
import { computed, reactive } from 'vue'

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
