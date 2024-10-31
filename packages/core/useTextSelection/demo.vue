<script setup lang="ts">
import { useTextSelection } from '@vueuse/core'
import { computed, ref } from 'vue'

const demo = ref()
const { rects, text } = useTextSelection()
const selectedStyle = computed(() => text.value ? 'text-primary' : 'text-gray-400')
</script>

<template>
  <div ref="demo">
    <p class="font-600 text-blue-600">
      您可以在页面上选择任何文本。
    </p>
    <p>
      <strong>所选文本：</strong>
      <em
        :class="selectedStyle"
        class="whitespace-pre h-44 overflow-y-auto block"
      >{{ text || '未选择任何内容' }}</em>
    </p>
    <p>
      <strong>所选矩形区域：</strong>
      <pre class="h-72" lang="json">{{ rects }}</pre>
    </p>
  </div>
</template>
