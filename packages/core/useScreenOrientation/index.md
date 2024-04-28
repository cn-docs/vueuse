---
category: Browser
---

# useScreenOrientation

响应式 [屏幕方向 API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API)。它为 Web 开发人员提供了关于用户当前屏幕方向的信息。

## 用法

```ts
import { useScreenOrientation } from '@vueuse/core'

const {
  isSupported,
  orientation,
  angle,
  lockOrientation,
  unlockOrientation,
} = useScreenOrientation()
```

要锁定方向，您可以将 [OrientationLockType](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/type) 传递给 lockOrientation 函数：

```ts
import { useScreenOrientation } from '@vueuse/core'

const {
  isSupported,
  orientation,
  angle,
  lockOrientation,
  unlockOrientation,
} = useScreenOrientation()

lockOrientation('portrait-primary')
```

然后再次解锁，使用以下方式：

```ts
unlockOrientation()
```

可接受的方向类型包括 `"landscape-primary"`、`"landscape-secondary"`、`"portrait-primary"`、`"portrait-secondary"`、`"any"`、`"landscape"`、`"natural"` 和 `"portrait"`。

[Screen Orientation API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API)
