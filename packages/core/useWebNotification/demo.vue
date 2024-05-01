<script setup lang="ts">
import { useWebNotification } from '@vueuse/core'
import type { UseWebNotificationOptions } from '@vueuse/core'

const options: UseWebNotificationOptions = {
  title: 'Hello, world from VueUse!',
  dir: 'auto',
  lang: 'en',
  renotify: true,
  tag: 'test',
}

const {
  isSupported,
  show,
} = useWebNotification(options)
</script>

<template>
  <div>
    <p>
      支持情况: <BooleanDisplay :value="isSupported" />
    </p>
  </div>

  <div v-if="isSupported">
    <button @click="show()">
      显示通知
    </button>
  </div>
  <div v-else>
    你的浏览器不支持通知 Web API。
  </div>
</template>
