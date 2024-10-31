<script setup lang="ts">
import { useActiveElement } from '@vueuse/core'
import { computed } from 'vue'

const activeElement = useActiveElement()
const key = computed(() => activeElement.value?.dataset?.id || 'null')
</script>

<template>
  <note class="mb-3">
    选择下面的 input 查看当前激活的元素
  </note>
  <div
    class="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-2"
  >
    <input
      v-for="i in 6"
      :key="i"
      type="text"
      :data-id="i"
      class="!my-0 !min-w-0"
      :placeholder="`${i}`"
    >
  </div>
  <div class="mt-2">
    当前激活的元素:
    <span class="text-primary">{{ key }}</span>
  </div>
</template>
