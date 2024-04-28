---
category: Sensors
---

# useBattery

响应式的 [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)，更常被称为电池 API，提供有关系统电池充电级别的信息，并允许在电池级别或充电状态发生变化时发送事件通知。这可以用来调整您的应用程序的资源使用，以减少电池耗尽时的电池消耗，或在电池耗尽之前保存更改，以防止数据丢失。

## 用法

```js
import { useBattery } from '@vueuse/core'

const { charging, chargingTime, dischargingTime, level } = useBattery()
```

| 状态            | 类型      | 描述                                         |
| --------------- | --------- | -------------------------------------------- |
| charging        | `Boolean` | 设备当前是否正在充电。                       |
| chargingTime    | `Number`  | 直到设备完全充满的秒数。                     |
| dischargingTime | `Number`  | 直到设备完全放电的秒数。                     |
| level           | `Number`  | 介于 0 和 1 之间的数字，表示当前的充电水平。 |

## 使用场景

我们的应用程序通常不会关注电池电量，但我们可以对应用程序进行一些调整，使其对电量较低的用户更友好。

- 触发特殊的“省电模式”暗色主题设置。
- 停止自动播放新闻动态中的视频。
- 禁用一些不是必要的后台任务。
- 限制网络调用并减少 CPU/内存消耗。

## Component Usage

```vue
<template>
  <UseBattery v-slot="{ charging }">
    正在充电: {{ charging }}
  </UseBattery>
</template>
```
