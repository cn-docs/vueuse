<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll({ behavior: 'smooth' })
</script>

<template>
  <div>
    <div>
      查看屏幕右下角的滚动值。
    </div>
    <div class="scroller" />
    <div class="float">
      <note class="mb-2">
        滚动值
      </note>
      x: {{ x }}<br>
      y: {{ y }}
    </div>
  </div>
  <button @click="x += 200">
    滚动 X
  </button>
  <button @click="y += 200">
    滚动 Y
  </button>
</template>

<style scoped>
.scroller {
  position: absolute;
  top: 100%;
  left: 100%;
  width: 10000px;
  height: 10000px;
}
</style>
