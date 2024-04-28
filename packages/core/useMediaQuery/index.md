---
category: Browser
---

# useMediaQuery

响应式的 [媒体查询](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries)。一旦您创建了一个 MediaQueryList 对象，您可以检查查询结果或在结果变化时接收通知。

## 使用方法

```js
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
```
