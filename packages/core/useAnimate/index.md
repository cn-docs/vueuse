---
category: Animation
---

# useAnimate

响应式的 [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)。

## 用法

### 基本用法

`useAnimate` 函数将返回动画及其控制函数。

```vue
<script setup>
import { useAnimate } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')
const {
  isSupported,
  animate,

  // actions
  play,
  pause,
  reverse,
  finish,
  cancel,

  // states
  pending,
  playState,
  replaceState,
  startTime,
  currentTime,
  timeline,
  playbackRate,
} = useAnimate(el, { transform: 'rotate(360deg)' }, 1000)
</script>

<template>
  <span ref="el" style="display:inline-block">useAnimate</span>
</template>
```

### 自定义关键帧

可以是关键帧对象的数组、关键帧对象，或者是一个 `ref`。更多详情请参考[关键帧格式](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)。

```ts
const keyframes = { transform: 'rotate(360deg)' }
// 或者
const keyframes = [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(360deg)' },
]
// 或者
const keyframes = ref([
  { clipPath: 'circle(20% at 0% 30%)' },
  { clipPath: 'circle(20% at 50% 80%)' },
  { clipPath: 'circle(20% at 100% 30%)' },
])

useAnimate(el, keyframes, 1000)
```
