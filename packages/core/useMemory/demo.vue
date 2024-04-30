<script lang="ts" setup>
import { useMemory } from '@vueuse/core'

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}
const { isSupported, memory } = useMemory()
</script>

<template>
  <div v-if="isSupported && memory" class="inline-grid grid-cols-2 gap-x-4 gap-y-2">
    <template v-if="memory">
      <div opacity="50">
        已使用
      </div><div>{{ size(memory.usedJSHeapSize) }}</div>
      <div opacity="50">
        已分配
      </div><div>{{ size(memory.totalJSHeapSize) }}</div>
      <div opacity="50">
        限制
      </div><div>{{ size(memory.jsHeapSizeLimit) }}</div>
    </template>
  </div>
  <div v-else>
    您的浏览器不支持性能内存 API
  </div>
</template>
