---
category: Sensors
---

# useDevicePixelRatio

响应式地跟踪 [`window.devicePixelRatio`](https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio)

> 注意：没有 `window.devicePixelRatio` 变化的事件监听器。所以这个函数使用 [`程序化测试媒体查询 (window.matchMedia)`](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries) ，应用与 [这个示例](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#monitoring_screen_resolution_or_zoom_level_changes) 中描述的相同机制。

## 用法

```js
import { useDevicePixelRatio } from '@vueuse/core'

export default {
  setup() {
    const { pixelRatio } = useDevicePixelRatio()

    return { pixelRatio }
  },
}
```

## 组件用法

```vue
<template>
  <UseDevicePixelRatio v-slot="{ pixelRatio }">
    像素比: {{ pixelRatio }}
  </UseDevicePixelRatio>
</template>
```
