---
category: Browser
---

# useWakeLock

响应式 [屏幕唤醒锁定 API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)。提供了一种防止设备在应用程序需要持续运行时变暗或锁定屏幕的方法。

## 用法

```js
import { useWakeLock } from '@vueuse/core'

const { isSupported, isActive, request, release } = useWakeLock()
```

如果调用了 `request`，`isActive` 将为 **true**，如果调用了 `release`，或者其他选项卡被显示，或者窗口被最小化，`isActive` 将为 **false**。
