<script setup lang="ts">
import type { ShallowRef } from 'vue'
import { useFileSystemAccess } from '@vueuse/core'
import { stringify } from '@vueuse/docs-utils'
import { reactive, shallowRef } from 'vue'

const dataType = shallowRef('Text') as ShallowRef<'Text' | 'ArrayBuffer' | 'Blob'>
const res = useFileSystemAccess({
  dataType,
  types: [{
    description: 'text',
    accept: {
      'text/plain': ['.txt', '.html'],
    },
  }],
  excludeAcceptAllOption: true,
})

const content = res.data
const str = stringify(reactive({
  isSupported: res.isSupported,
  file: res.file,
  fileName: res.fileName,
  fileMIME: res.fileMIME,
  fileSize: res.fileSize,
  fileLastModified: res.fileLastModified,
}))

async function onSave() {
  await res.save()
}
</script>

<template>
  <div>
    <div flex="~ gap-1" items-center>
      <button @click="res.open()">
        打开
      </button>
      <button @click="res.updateData()">
        更新
      </button>
      <button @click="res.create()">
        新建文件
      </button>
      <button :disabled="!res.file.value" @click="onSave">
        保存
      </button>
      <button :disabled="!res.file.value" @click="res.saveAs()">
        另存为
      </button>

      <div ml5>
        <div text-xs op50>
          数据类型
        </div>
        <select v-model="dataType" class="outline-none w-30 px2 py1 text-sm" border="~ main rounded">
          <option value="Text">
            文本
          </option>
          <option value="ArrayBuffer">
            ArrayBuffer
          </option>
          <option value="Blob">
            Blob
          </option>
        </select>
      </div>
    </div>

    <pre class="code-block" lang="yaml">{{ str }}</pre>

    <div v-if="content">
      内容
      <textarea
        v-if="typeof content === 'string'"
        v-model="content" rows="20" cols="40" w-full
      />
      <span v-else>{{ content }}</span>
    </div>
  </div>
</template>
