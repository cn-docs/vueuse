<script setup lang="ts">
import { onStartTyping, watchPausable } from '@vueuse/core'
import { shallowRef } from 'vue'

const input = shallowRef<HTMLInputElement | null>()
const log = shallowRef('')

const source = shallowRef('')

const watcher = watchPausable(
  source,
  v => (log.value += `Changed to "${v}"\n`),
)

onStartTyping(() => input.value?.focus())

function clear() {
  log.value = ''
}
function pause() {
  log.value += '暂停\n'
  watcher.pause()
}
function resume() {
  log.value += '恢复\n'
  watcher.resume()
}

const { isActive } = watcher
</script>

<template>
  <div>
    <note class="mb-2">
      在下方输入以触发观察
    </note>
    <input
      ref="input"
      v-model="source"
      type="text"
    >

    <button :disabled="!isActive" class="orange" @click="pause">
      暂停
    </button>
    <button :disabled="isActive" @click="resume">
      恢复
    </button>
    <button @click="clear">
      清除日志
    </button>

    <br>
    <br>

    <note>日志</note>

    <pre>{{ log }}</pre>
  </div>
</template>
