<script setup lang="ts">
import { useShare } from '@vueuse/core'
import { isClient } from '@vueuse/shared'
import { ref } from 'vue'

const options = ref({
  title: 'VueUse',
  text: 'Collection of essential Vue Composition Utilities!',
  url: isClient ? location.href : '',
})

const { share, isSupported } = useShare(options)

function startShare() {
  return share().catch(err => err)
}
</script>

<template>
  <div>
    <input
      v-if="isSupported"
      v-model="options.text"
      type="text"
      placeholder="备注"
    >
    <button :disabled="!isSupported" @click="startShare">
      {{ isSupported ? '分享' : '您的浏览器不支持 Web 分享' }}
    </button>
  </div>
</template>
