---
category: Sensors
---

# useDeviceMotion

响应式的 [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)。为开发者提供设备位置和方向变化速度的信息。

## 用法

```js
import { useDeviceMotion } from '@vueuse/core'

const {
  acceleration,
  accelerationIncludingGravity,
  rotationRate,
  interval,
} = useDeviceMotion()
```

> 注意：对于 iOS 设备，你需要使用 `trigger` 并将其与用户交互绑定。
> 在获得权限后，API 将自动运行

| 状态                         | 类型            | 描述                                                                 |
| ---------------------------- | --------------- | -------------------------------------------------------------------- |
| acceleration                 | `object`        | 一个对象，给出设备在 X、Y 和 Z 三个轴上的加速度。                    |
| accelerationIncludingGravity | `object`        | 一个对象，给出设备在 X、Y 和 Z 三个轴上的加速度，包括重力影响。      |
| rotationRate                 | `object`        | 一个对象，给出设备在 alpha、beta 和 gamma 三个方向轴上的方向变化率。 |
| interval                     | `Number`        | 一个数字，表示从设备获取数据的间隔时间，以毫秒为单位。               |
| ensurePermissions            | `boolean`       | 指示平台是否需要权限才能使用该 API                                   |
| permissionGranted            | `boolean`       | 指示用户是否已授予权限。默认为 false                                 |
| trigger                      | `Promise<void>` | 一个异步函数，用于请求用户权限。一旦获得权限，API 将自动运行         |

你可以在 [MDN 上找到更多关于状态的信息](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent#Properties)。

## 组件用法

```vue
<template>
  <UseDeviceMotion v-slot="{ acceleration }">
    加速度: {{ acceleration }}
  </UseDeviceMotion>
</template>
```
