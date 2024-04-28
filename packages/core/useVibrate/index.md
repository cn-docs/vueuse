---
category: Browser
---

# useVibrate

响应式 [振动 API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)

大多数现代移动设备都包含振动硬件，使软件能够通过使设备震动来向用户提供物理反馈。

振动 API 为 Web 应用程序提供了访问此硬件的能力，如果设备支持该功能，则允许使用它，如果设备不支持，则不执行任何操作。

## 用法

振动被描述为一种开关脉冲的模式，可能具有不同的长度。

该模式可以是一个描述以毫秒为单位的振动时间的整数，也可以是一个描述振动和暂停模式的整数数组。

```ts
import { useVibrate } from '@vueuse/core'

// 这会让设备振动 300 毫秒
// 然后在振动设备另外 300 毫秒之前暂停 100 毫秒：
const { vibrate, stop, isSupported } = useVibrate({ pattern: [300, 100, 300] })

// 开始振动，当模式完成时，它将自动停止：
vibrate()

// 但是如果你想停止它，你可以：
stop()
```
