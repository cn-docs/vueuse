---
category: Sensors
related: useUserMedia
---

# useDisplayMedia

响应式 [`mediaDevices.getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) 流。

## 用法

```ts
import { useDisplayMedia } from '@vueuse/core'

const { stream, start } = useDisplayMedia()

// 开始流式传输

start()
```

```ts
const video = document.getElementById('video')

watchEffect(() => {
  // 在视频元素上预览
  video.srcObject = stream.value
})
```
