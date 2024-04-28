---
category: Sensors
---

# useDeviceMotion

响应式 [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)。提供有关设备位置和方向变化速度的信息给 Web 开发者。

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

| 状态                         | 类型     | 描述                                                                   |
| ---------------------------- | -------- | ---------------------------------------------------------------------- |
| acceleration                 | `object` | 一个对象，提供设备在三个轴 X、Y 和 Z 上的加速度。                      |
| accelerationIncludingGravity | `object` | 一个对象，提供设备在三个轴 X、Y 和 Z 上受到重力影响后的加速度。        |
| rotationRate                 | `object` | 一个对象，提供设备在三个方向轴 alpha、beta 和 gamma 上方向变化的速率。 |
| interval                     | `Number` | 一个表示以毫秒为单位从设备获取数据的时间间隔的数字。                   |

您可以在 [MDN 上找到有关状态的更多信息](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent#Properties)。

## 组件用法

```vue
<template>
  <UseDeviceMotion v-slot="{ acceleration }">
    加速度：{{ acceleration }}
  </UseDeviceMotion>
</template>
```
