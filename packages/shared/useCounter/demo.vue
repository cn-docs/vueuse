```vue
<script setup lang="ts">
import { useCounter } from '@vueuse/core'

const { count, inc, dec, set, reset } = useCounter()
</script>

<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="inc()">
      增加
    </button>
    <button @click="dec()">
      减少
    </button>
    <button @click="inc(5)">
      增加（+5）
    </button>
    <button @click="dec(5)">
      减少（-5）
    </button>
    <button @click="set(100)">
      设定（100）
    </button>
    <button @click="reset()">
      重置
    </button>
  </div>
</template>
```
