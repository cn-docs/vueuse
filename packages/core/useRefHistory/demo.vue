<script setup lang="ts">
import { useCounter } from '@vueuse/shared'
import { formatDate, useRefHistory } from '@vueuse/core'

function format(ts: number) {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}

const { count, inc, dec } = useCounter()
const { history, undo, redo, canUndo, canRedo } = useRefHistory(count, { capacity: 10 })
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
  <br>
  <note>历史记录（为演示限制在 10 条记录内）</note>
  <div class="code-block mt-4">
    <div v-for="i in history" :key="i.timestamp">
      <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
      <span class="font-mono">{ 值：{{ i.snapshot }} }</span>
    </div>
  </div>
</template>
