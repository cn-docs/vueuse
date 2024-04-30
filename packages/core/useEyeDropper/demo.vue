<script lang="ts" setup>
import { useEyeDropper } from '@vueuse/core'

const { isSupported, open, sRGBHex } = useEyeDropper()
</script>

<template>
  <div v-if="isSupported">
    <div>是否支持: {{ isSupported }}</div>
    <div>sRGB十六进制: <span :style="{ color: sRGBHex }">{{ sRGBHex }}</span></div>
    <button
      :disabled="!isSupported"
      @click="() => open()"
    >
      打开取色器
    </button>
  </div>
  <div v-else>
    <span>你的浏览器不支持此功能</span>
  </div>
</template>
