<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')
const isVisible = useElementVisibility(el)
</script>

<template>
  <div>
    <note class="mb-2">
      右下角的信息
    </note>
    <div ref="el" class="max-w-100 relative area bg-white dark:bg-gray-800 shadow-lg z-60">
      目标元素（向下滚动）
    </div>
  </div>
  <div class="float m-3 area shadow-lg">
    元素
    <BooleanDisplay
      :value="isVisible"
      true="内部"
      false="外部"
      class="font-bold"
    />
    视口
  </div>
</template>
