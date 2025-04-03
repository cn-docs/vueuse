---
category: '@Electron'
---

# useZoomLevel

响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放级别。

## 用法

```ts
import { useZoomLevel } from '@vueuse/electron'

// 如果没有显式提供 webFrame，请启用 nodeIntegration
// 参见：https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// 返回 Ref 结果
const level = useZoomLevel()
console.log(level.value) // 打印当前缩放级别
level.value = 2 // 修改当前缩放级别
```

立即设置初始缩放级别

```js
import { useZoomLevel } from '@vueuse/electron'

const level = useZoomLevel(2)
```

传递一个 `ref`，当源 `ref` 更改时，级别将更新

```js
import { shallowRef } from 'vue'
import { useZoomLevel } from '@vueuse/electron'

const level = shallowRef(1)

useZoomLevel(level) // 级别将与 ref 匹配

level.value = 2 // 级别将更改
```
