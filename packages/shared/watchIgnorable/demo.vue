<script setup lang="ts">
import { watchIgnorable } from '@vueuse/core'
import { shallowRef } from 'vue'

const log = shallowRef('')
const source = shallowRef(0)

const { ignoreUpdates } = watchIgnorable(
  source,
  v => (log.value += `更改为 "${v}"\n`),
  { flush: 'sync' },
)

function clear() {
  source.value = 0
  log.value = ''
}
function update() {
  source.value++
}
function ignoredUpdate() {
  ignoreUpdates(() => {
    source.value++
  })
}
</script>

<template>
  <div>数值: {{ source }}</div>
  <button @click="update">
    更新
  </button>
  <button class="orange" @click="ignoredUpdate">
    忽略更新
  </button>
  <button @click="clear">
    重置
  </button>

  <br>

  <note>日志</note>

  <pre>{{ log }}</pre>
</template>
