<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'

const count = ref(5)
const refs = useTemplateRefsList<HTMLDivElement>()

watch(refs, async () => {
  await nextTick()
  console.log([...refs.value])
}, {
  deep: true,
  flush: 'post',
})
</script>

<template>
  <span v-for="i of count" :key="i" :ref="refs.set" class="mr-2">
    {{ i }}
  </span>
  <br>
  <button @click="count += 1">
    增加
  </button>
  <button :disabled="count <= 0" @click="count -= 1">
    减少
  </button>
  <note>打开控制台查看输出</note>
</template>
