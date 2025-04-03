<script setup lang="ts">
import { interval } from 'rxjs'
import { shallowRef } from 'vue'
import { useSubscription } from './index'

const count = shallowRef(0)
useSubscription(
  interval(1000)
    .subscribe(() => {
      count.value++
    }),
)
</script>

<template>
  <note>每1s更新一次</note>
  <p>Counter: {{ count }}</p>
</template>
