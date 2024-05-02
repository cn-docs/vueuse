<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { rand } from '@vueuse/shared'

const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', 'Hello', 'Привет']
const word = ref('Hello')
const interval = ref(500)

const { pause, resume, isActive } = useIntervalFn(() => {
  word.value = greetings[rand(0, greetings.length - 1)]
}, interval)
</script>

<template>
  <p>{{ word }}</p>
  <p>
    间隔：
    <input v-model="interval" type="number" placeholder="间隔">
  </p>
  <button v-if="isActive" class="orange" @click="pause">
    暂停
  </button>
  <button v-if="!isActive" @click="resume">
    恢复
  </button>
</template>
