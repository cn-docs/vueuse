<script setup lang="ts">
import { useScreenOrientation } from './index'

const { isSupported, orientation, angle } = useScreenOrientation()
</script>

<template>
  <note class="mb-2">
    为了获得最佳效果，请使用手机或平板设备（或使用浏览器的原生检查器来模拟屏幕方向变化）
  </note>
  <div>
    是否支持： <boolean-display :value="isSupported">
      {{ isSupported }}
    </boolean-display>
  </div>
  <div> Orientation 类型： <b>{{ orientation }}</b></div>
  <div> Orientation 角度： <b>{{ angle }}</b></div>
</template>
