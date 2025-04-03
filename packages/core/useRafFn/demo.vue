<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRafFn } from './index'

const fpsLimit = 60
const count = shallowRef(0)
const deltaMs = shallowRef(0)
const { pause, resume } = useRafFn(({ delta }) => {
  deltaMs.value = delta
  count.value += 1
}, { fpsLimit })
</script>

<template>
  <div font-mono>
    帧数：{{ count }}
  </div>
  <div font-mono>
    间隔时间：{{ deltaMs.toFixed(0) }}毫秒
  </div>
  <div font-mono>
    FPS 限制：{{ fpsLimit }}
  </div>
  <button @click="pause">
    暂停
  </button>
  <button @click="resume">
    恢复
  </button>
</template>
