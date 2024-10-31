<script setup lang="ts">
import { interval } from 'rxjs'
import { mapTo, scan, startWith } from 'rxjs/operators'
import { ref } from 'vue-demi'
import { useExtractedObservable } from '.'

const start = ref(0)

const count = useExtractedObservable(
  start,
  (start) => {
    return interval(1000).pipe(
      mapTo(1),
      startWith(start),
      scan((total, next) => next + total),
    )
  },
)
</script>

<template>
  <note>每 1 秒更新一次</note>
  <label>
    开始: <input v-model="start" type="number">
  </label>
  <p>计数器: {{ count }}</p>
</template>
