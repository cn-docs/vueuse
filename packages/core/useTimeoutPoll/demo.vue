<script setup lang="ts">
import { useTimeoutPoll } from '@vueuse/core'
import { promiseTimeout } from '@vueuse/shared'
import { shallowRef } from 'vue'

const count = shallowRef(0)

async function fetchData() {
  await promiseTimeout(1000)
  count.value++
}

const { isActive, pause, resume } = useTimeoutPoll(fetchData, 1000)
</script>

<template>
  <div>
    <div>Count: {{ count }}</div>
    <div>isActive: {{ isActive }}</div>
    <div>
      <button @click="pause">
        暂停
      </button>
      <button @click="resume">
        恢复
      </button>
    </div>
  </div>
</template>
