<script setup lang="ts">
import { effect, ref } from 'vue'
import { useClipboardItems, usePermission } from '@vueuse/core'

const input = ref('')

const { content, isSupported, copy } = useClipboardItems()
const computedText = ref('')
effect(() => {
  Promise.all(content.value.map(item => item.getType('text/html')))
    .then((blobs) => {
      return Promise.all(blobs.map(blob => blob.text()))
    })
    .then((texts) => {
      computedText.value = texts.join('')
    })
})
const permissionRead = usePermission('clipboard-read')
const permissionWrite = usePermission('clipboard-write')

function createClipboardItems(text: string) {
  const mime = 'text/html'
  const blob = new Blob([text], { type: mime })
  return new ClipboardItem({
    [mime]: blob,
  })
}
</script>

<template>
  <div v-if="isSupported">
    <note>
      剪贴板权限：读取 <b>{{ permissionRead }}</b> | 写入 <b>{{ permissionWrite }}</b>
    </note>
    <p>
      当前已复制的内容：<code>{{ (computedText && `${computedText}（mime: text/html）`) || "无" }}</code>
    </p>
    <input v-model="input" type="text">
    <button
      @click="
        copy([createClipboardItems(input)])
      "
    >
      复制
    </button>
  </div>
  <p v-else>
    您的浏览器不支持剪贴板 API
  </p>
</template>
