<script setup lang="ts">
import { useDateFormat, useTimestamp, useWebWorkerFn } from '@vueuse/core'
import { computed, nextTick, shallowRef } from 'vue'

function heavyTask() {
  const randomNumber = () => Math.trunc(Math.random() * 5_000_00)
  const numbers: number[] = Array.from({ length: 5_000_000 }).fill(undefined).map(randomNumber)
  numbers.sort()
  return numbers.slice(0, 5)
}

const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn(heavyTask)
const time = useTimestamp()
const computedTime = useDateFormat(time, 'YYYY-MM-DD HH:mm:ss SSS')
const running = computed(() => workerStatus.value === 'RUNNING')

const data = shallowRef<number[] | null>(null)
const runner = shallowRef('')

async function baseSort() {
  data.value = null
  await nextTick()
  data.value = heavyTask()
  runner.value = 'Main'
}

async function workerSort() {
  data.value = null
  await nextTick()
  data.value = await workerFn()
  runner.value = 'Worker'
}
</script>

<template>
  <p>当前时间：<b>{{ computedTime }}</b></p>
  <note class="mb-2">
    这是一个演示，对包含 500 万个数字的大数组进行排序，使用 WebWorker 或不使用 WebWorker。<br>当发生 UI 阻塞时，时间停止。
  </note>
  <button @click="baseSort">
    在主线程中排序
  </button>
  <button v-if="!running" @click="workerSort">
    在 Worker 线程中排序
  </button>
  <button v-else class="orange" @click="workerTerminate('PENDING')">
    终止 Worker 线程
  </button>
  <p v-if="data">
    线程：<strong>{{ runner }}</strong><br>
    结果：<strong>{{ data }}</strong>
  </p>
</template>
