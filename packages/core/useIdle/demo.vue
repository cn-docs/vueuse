<script setup lang="ts">
import { useIdle, useTimestamp } from '@vueuse/core'
import { computed } from 'vue'

const { idle, lastActive } = useIdle(5000)

const now = useTimestamp({ interval: 1000 })

const idledFor = computed(() =>
  Math.floor((now.value - lastActive.value) / 1000))
</script>

<template>
  <note class="mb-2">
    为了演示目的，在此演示中将空闲超时设置为 <b>5秒</b>（默认为1分钟）。
  </note>
  <div class="mb-2">
    空闲状态: <BooleanDisplay :value="idle" />
  </div>
  <div>非活动时间: <b class="text-primary">{{ idledFor }}秒</b></div>
</template>
