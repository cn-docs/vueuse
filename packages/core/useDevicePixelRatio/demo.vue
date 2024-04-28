<script setup lang="ts">
import { reactive } from 'vue'
import { stringify } from '@vueuse/docs-utils'
import { useDevicePixelRatio } from '@vueuse/core'

const pixelRatio = reactive(useDevicePixelRatio())
const code = stringify(pixelRatio)
</script>

<template>
  <div>设备像素比：</div>
  <pre>{{ code }}</pre>
  <span class="opacity-50">放大和缩小（或将窗口移动到具有不同缩放因子的屏幕）以查看值的变化</span>
</template>
