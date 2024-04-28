---
category: Sensors
---

# useDeviceOrientation

响应式 [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)。为 Web 开发者提供来自运行网页的设备的物理方向信息。

## 用法

```js
import { useDeviceOrientation } from '@vueuse/core'

const {
  isAbsolute,
  alpha,
  beta,
  gamma,
} = useDeviceOrientation()
```

| 状态       | 类型      | 描述                                                                |
| ---------- | --------- | ------------------------------------------------------------------- |
| isAbsolute | `boolean` | 一个布尔值，指示设备是否绝对提供方向数据。                          |
| alpha      | `number`  | 一个表示设备围绕 z 轴运动的数字，以度为单位，值范围从 0 到 360。    |
| beta       | `number`  | 一个表示设备围绕 x 轴运动的数字，以度为单位，值范围从 -180 到 180。 |
| gamma      | `number`  | 一个表示设备围绕 y 轴运动的数字，以度为单位，值范围从 -90 到 90。   |

您可以在 [MDN 上找到有关状态的更多信息](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent#Properties)。

## 组件用法

```vue
<template>
  <UseDeviceOrientation v-slot="{ alpha, beta, gamma }">
    Alpha: {{ alpha }}
    Beta: {{ beta }}
    Gamma: {{ gamma }}
  </UseDeviceOrientation>
</template>
```
