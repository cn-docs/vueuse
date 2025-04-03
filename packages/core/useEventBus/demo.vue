<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import { shallowRef } from 'vue'

const { on, emit } = useEventBus<string>('vue-use-event-bus')
const message = shallowRef('')
const news = [
  'Su Bingtian broke the Asian record and entered the Olympic 100-meter race finals as the first person in China-RTHK',
  'Comprehensive investigation in Zhengzhou to avoid further spread of the epidemic-RTHK',
  '130 stroke experts after vaccination: nothing to do with the vaccine',
  'China adds two gold medals in Olympic diving and weightlifting',
  'Tokyo Olympic service provokes athletes sleeping in cardboard suitcases and eating canned food, reviewing the Beijing Olympics god-level arrangements',
]
on(_message => message.value = news[Math.floor(Math.random() * news.length)])
</script>

<template>
  <div style="display: flex; gap: 100px;">
    <div>
      <div class="whitespace-nowrap">
        新闻频道：
      </div>
      <button class="whitespace-nowrap" @click="emit('东京奥运会已开始')">
        广播
      </button>
    </div>
    <div>
      <div style="margin-bottom: 13px;">
        电视：
      </div>
      <div>{{ message || '--- 无信号 ---' }}</div>
    </div>
  </div>
</template>
