<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const [value, toggle] = useToggle()
</script>

<template>
  <div>
    <p>值：{{ value ? '开' : '关' }}</p>  <!-- 根据 value 的值显示“开”或“关” -->
    <button @click="toggle()">
      切换
    </button>
    <button @click="value = true">
      设为开
    </button>
    <button @click="value = false">
      设为关
    </button>
  </div>
</template>
