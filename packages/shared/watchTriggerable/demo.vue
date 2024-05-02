<script setup lang="ts">
import { ref } from 'vue'
import { watchTriggerable } from '@vueuse/core'

const log = ref('')
const source = ref(0)

const { trigger, ignoreUpdates } = watchTriggerable(
  source,
  async (v, _, onCleanup) => {
    let canceled = false
    onCleanup(() => canceled = true)
    await new Promise(resolve => setTimeout(resolve, 500))
    if (canceled)
      return

    log.value += `The value is "${v}"\n`
  },
)

function clear() {
  ignoreUpdates(() => {
    source.value = 0
    log.value = ''
  })
}
function update() {
  source.value++
}
</script>

<template>
  <div>数值：{{ source }}</div>
  <button @click="update">
    更新
  </button>
  <button class="orange" @click="trigger">
    手动触发
  </button>
  <button @click="clear">
    重置
  </button>

  <br>

  <note>日志（500 毫秒延迟）</note>

  <pre>{{ log }}</pre>
</template>
