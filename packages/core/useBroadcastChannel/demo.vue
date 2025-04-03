<script setup lang="ts">
import { useBroadcastChannel } from '@vueuse/core'
import { shallowRef, watch } from 'vue'

const {
  isSupported,
  data,
  post,
  error,
} = useBroadcastChannel({ name: 'vueuse-demo-channel' })

const message = shallowRef('')

watch(data, () => {
  if (data.value)
    alert(data.value)
})
</script>

<template>
  <div>
    <p>
      支持:
      <b>{{ isSupported }}</b>
    </p>

    <p>请在至少两个Tab中打开此页面</p>
  </div>

  <div v-if="isSupported">
    <form @submit.prevent="post(message)">
      <input v-model="message" type="text">
      <button type="submit">
        发送消息
      </button>
    </form>

    <p v-if="data">
      收到: {{ data }}
    </p>

    <p v-if="error">
      错误: {{ error }}
    </p>
  </div>
  <div v-else>
    您的浏览器不支持广播频道 Web API。
  </div>
</template>
