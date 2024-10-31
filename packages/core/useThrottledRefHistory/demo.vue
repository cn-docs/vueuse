<script setup lang="ts">
import type { Ref } from 'vue'
import { formatDate, useThrottledRefHistory } from '@vueuse/core'
import { useCounter } from '@vueuse/shared'
import { ref } from 'vue'

function format(ts: number) {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}
const delay: Ref<number> = ref(1000)

const { count, inc, dec } = useCounter()
const { history, undo, redo, canUndo, canRedo } = useThrottledRefHistory(
  count,
  {
    deep: true,
    throttle: delay,
    capacity: 10,
    trailing: true,
  },
)
</script>

<template>
  <div>计数：{{ count }}</div>
  <button @click="inc()">
    增加
  </button>
  <button @click="dec()">
    减少
  </button>
  <span class="ml-2">/</span>
  <button :disabled="!canUndo" @click="undo()">
    撤销
  </button>
  <button :disabled="!canRedo" @click="redo()">
    重做
  </button>
  <br>
  <span>延迟时间（毫秒）：</span>
  <input v-model="delay" type="number">
  <br>
  <br>
  <note>历史记录（为演示目的限制为10条记录）</note>
  <div class="code-block mt-4">
    <div v-for="i in history" :key="i.timestamp">
      <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
      <span class="font-mono">{ value: {{ i.snapshot }} }</span>
    </div>
  </div>
</template>
