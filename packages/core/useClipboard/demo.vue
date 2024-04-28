<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard, usePermission } from '@vueuse/core'

const input = ref('')

const { text, isSupported, copy } = useClipboard()
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')
</script>

<template>
  <div v-if="isSupported">
    <note>
      剪贴板权限：读取 <b>{{ permissionRead }}</b> | 写入 <b>{{ permissionWrite }}</b>
    </note>
    <p>
      当前复制的内容：<code>{{ text || '无' }}</code>
    </p>
    <input v-model="input" type="text">
    <button @click="copy(input)">
      复制
    </button>
  </div>
  <p v-else>
    您的浏览器不支持剪贴板 API
  </p>
</template>
