<script setup lang="ts">
import { useDropZone, useEventListener } from '@vueuse/core'
import { ref } from 'vue'

const filesData = ref<{ name: string, size: number, type: string, lastModified: number }[]>([])
const imageFilesData = ref<{ name: string, size: number, type: string, lastModified: number }[]>([])

function onDrop(files: File[] | null) {
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

function onImageDrop(files: File[] | null) {
  imageFilesData.value = []
  if (files) {
    imageFilesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

const dropZoneRef = ref<HTMLElement>()
const imageDropZoneRef = ref<HTMLElement>()
const pngRef = ref()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

useEventListener(pngRef, 'dragstart', (event) => {
  event.dataTransfer?.setData('image/png', '/vue.png')
})

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, { dataTypes: ['image/png'], onDrop: onImageDrop })
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="w-full h-auto relative">
      <p>拖放文件到拖放区域</p>

      <div class="flex gap-6">
        <div class="flex flex-col items-center">
          <img ref="pngRef" src="/vue.png" alt="拖放我" h-10>
          <span>PNG</span>
        </div>
        <div class="flex flex-col items-center">
          <img src="/favicon.svg" alt="拖放我" h-10>
          <span>SVG</span>
        </div>
      </div>

      <div grid="~ cols-2 gap-2">
        <div
          ref="dropZoneRef"
          class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6 rounded"
        >
          <div font-bold mb2>
            通用拖放区域
          </div>
          <div>
            是否在拖放区域内：
            <BooleanDisplay :value="isOverDropZone" />
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div v-for="(file, index) in filesData" :key="index" class="w-200px bg-black-200/10 ma-2 pa-6">
              <p>名称：{{ file.name }}</p>
              <p>大小：{{ file.size }}</p>
              <p>类型：{{ file.type }}</p>
              <p>上次修改时间：{{ file.lastModified }}</p>
            </div>
          </div>
        </div>
        <div
          ref="imageDropZoneRef"
          class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6 rounded"
        >
          <div font-bold mb2>
            图片拖放区域
          </div>
          <div>
            是否在图片拖放区域内：
            <BooleanDisplay :value="isOverImageDropZone" />
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div v-for="(file, index) in imageFilesData" :key="index" class="w-200px bg-black-200/10 ma-2 pa-6">
              <p>名称：{{ file.name }}</p>
              <p>大小：{{ file.size }}</p>
              <p>类型：{{ file.type }}</p>
              <p>上次修改时间：{{ file.lastModified }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
