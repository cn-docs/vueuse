---
category: '@Electron'
---

# useZoomFactor

响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放因子。

## 用法

```ts
import { useZoomFactor } from '@vueuse/electron'

// 如果没有显式提供 webFrame，请启用 nodeIntegration
// 参见：https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// 返回 Ref 结果
const factor = useZoomFactor()
console.log(factor.value) // 打印当前缩放因子
factor.value = 2 // 修改当前缩放因子
```

立即设置初始缩放因子

```js
import { useZoomFactor } from '@vueuse/electron'

const factor = useZoomFactor(2)
```

传递一个 `ref`，当源 `ref` 更改时，缩放因子将更新

```js
import { shallowRef } from 'vue'
import { useZoomFactor } from '@vueuse/electron'

const factor = shallowRef(1)

useZoomFactor(factor) // 缩放因子将与 ref 匹配

factor.value = 2 // 缩放因子将更改
```
