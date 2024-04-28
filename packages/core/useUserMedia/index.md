---
category: Sensors
related: useDevicesList, usePermission
---

# useUserMedia

响应式 [`mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) 流。

## 用法

```js
import { useUserMedia } from '@vueuse/core'

const { stream, start } = useUserMedia()

start()
```

```ts
const video = document.getElementById('video')

watchEffect(() => {
  // 在 video 元素上预览
  video.srcObject = stream.value
})
```

### 设备

```js
import { useDevicesList, useUserMedia } from '@vueuse/core'

const {
  videoInputs: cameras,
  audioInputs: microphones,
} = useDevicesList({
  requestPermissions: true,
})
const currentCamera = computed(() => cameras.value[0]?.deviceId)
const currentMicrophone = computed(() => microphones.value[0]?.deviceId)

const { stream } = useUserMedia({
  constraints: {
    video: { deviceId: currentCamera },
    audio: { deviceId: currentMicrophone, }
  }
})
```
