<script lang="ts" setup>
import type { Ref } from 'vue'
import { formatDate, useDebouncedRefHistory } from '@vueuse/core'
import { useCounter } from '@vueuse/shared'

import { ref } from 'vue'

function format(ts: number) {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}
const delay: Ref<number> = ref(1000)

const { count, inc, dec } = useCounter()
const { history, undo, redo, canUndo, canRedo } = useDebouncedRefHistory(
  count,
  { capacity: 10, debounce: delay },
)
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
  <button :disabled="!canUndo" @click="undo()">
    撤消
  </button>
  <button :disabled="!canRedo" @click="redo()">
    重做
  </button>
  <br>
  <span>延迟（毫秒）:</span>
  <input v-model="delay" type="number">
  <br>
  <br>
  <note>历史记录（仅限演示，最多保存10条记录）</note>
  <div class="code-block mt-4">
    <div v-for="i in history" :key="i.timestamp">
      <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
      <span class="font-mono">{ value: {{ i.snapshot }} }</span>
    </div>
  </div>
</template>
