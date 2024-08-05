---
category: Browser
---

# useWakeLock

响应式 [屏幕唤醒锁定 API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)。提供了一种防止设备在应用程序需要持续运行时变暗或锁定屏幕的方法。

## 用法

```js
import { useWakeLock } from '@vueuse/core'

const { isSupported, isActive, forceRequest, request, release } = useWakeLock()
```

当调用 `request` 时，如果文档是可见的，将会请求唤醒锁。否则，请求将会排队等待文档变得可见。如果请求成功，`isActive` 将会是 **true**。每当文档隐藏时，`isActive` 将会是 **false**。

当调用 `release` 时，唤醒锁将会被释放。如果有排队的请求，将会被取消。

要立即请求唤醒锁，即使文档是隐藏的，请使用 `forceRequest`。请注意，如果文档是隐藏的，这可能会抛出错误。
