<script setup lang="ts">
import { formatDate, useManualRefHistory } from '@vueuse/core'
import { useCounter } from '@vueuse/shared'

function format(ts: number) {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}

const { inc, dec, count } = useCounter()
const { canUndo, canRedo, history, commit, undo, redo } = useManualRefHistory(count, { capacity: 10 })
</script>

<template>
  <div>Count: {{ count }}</div>
  <button @click="inc()">
    增加
  </button>
  <button @click="dec()">
    减少
  </button>
  <span class="ml-2">/</span>
  <button @click="commit()">
    提交
  </button>
  <button :disabled="!canUndo" @click="undo()">
    撤销
  </button>
  <button :disabled="!canRedo" @click="redo()">
    重做
  </button>
  <br>
  <br>
  <note>历史记录（演示限制为 10 条记录）</note>
  <div class="code-block mt-4">
    <div v-for="i in history" :key="i.timestamp">
      <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
      <span class="font-mono">{ value: {{ i.snapshot }} }</span>
    </div>
  </div>
</template>
