---
category: Browser
---

# useMediaControls

为 `audio` 和 `video` 元素提供响应式的媒体控制。

## 使用方法

### 基本用法

```vue
<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'

const video = useTemplateRef('video')
const { playing, currentTime, duration, volume } = useMediaControls(video, {
  src: 'video.mp4',
})

// 更改初始媒体属性
onMounted(() => {
  volume.value = 0.5
  currentTime.value = 60
})
</script>

<template>
  <video ref="video" />
  <button @click="playing = !playing">
    播放 / 暂停
  </button>
  <span>{{ currentTime }} / {{ duration }}</span>
</template>
```

### 提供字幕、副标题等...

您可以在 `useMediaControls` 函数的 `tracks` 选项中提供字幕、副标题等。该函数将返回一个包含轨道的数组，以及两个控制它们的函数，`enableTrack`、`disableTrack` 和 `selectedTrack`。使用这些函数，您可以管理当前选择的轨道。如果没有选择的轨道，`selectedTrack` 将为 `-1`。

```vue
<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const video = useTemplateRef('video')
const {
  tracks,
  enableTrack
} = useMediaControls(video, {
  src: 'video.mp4',
  tracks: [
    {
      default: true,
      src: './subtitles.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
  ]
})
</script>

<template>
  <video ref="video" />
  <button v-for="track in tracks" :key="track.id" @click="enableTrack(track)">
    {{ track.label }}
  </button>
</template>
```
