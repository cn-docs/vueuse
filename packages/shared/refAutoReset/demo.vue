<script setup lang="ts">
import { refAutoReset } from '@vueuse/core'

const message = refAutoReset('Default message', 1000)

function setMessage() {
  message.value = 'Changed'
}
</script>

<template>
  <div>
    <button @click="setMessage()">
      更改 message
    </button>
    <p>
      {{ message }}
    </p>
  </div>
</template>
