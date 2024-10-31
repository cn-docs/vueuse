<script setup lang="ts">
import { ref } from 'vue'
import EagerDemo from './demo/EagerDemo.vue'
import LazyDemo from './demo/LazyDemo.vue'
import { count } from './demo/state'

const lazyRenders = ref(0)
const eagerRenders = ref(0)
</script>

<template>
  <div grid grid-cols-2>
    <div>
      <span text-primary font-bold>惰性计算</span>
      <div font-mono>
        <LazyDemo @update="lazyRenders++" />
        <div>
          渲染次数: {{ lazyRenders }}
        </div>
      </div>
    </div>
    <div>
      <span text-primary font-bold>急性计算</span>
      <div font-mono>
        <EagerDemo @update="eagerRenders++" />
        <div>渲染次数: {{ eagerRenders }}</div>
      </div>
    </div>
  </div>

  <div mt-4 font-mono>
    计数: {{ count }}
  </div>
  <button secondary @click="count--">
    减少
  </button>
  <button @click="count++">
    增加
  </button>
</template>
