---
category: '@Electron'
---

# useIpcRenderer

提供 [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 及其所有 API。

## 使用方法

```ts
import { useIpcRenderer } from '@vueuse/electron'

// 如果你不显式提供 ipcRenderer，需要启用 nodeIntegration
// 参见：https://www.electronjs.org/docs/api/webview-tag#nodeintegration
const ipcRenderer = useIpcRenderer()

// Ref 结果将返回
const result = ipcRenderer.invoke<string>('custom-channel', '一些数据')
const msg = computed(() => result.value?.msg)

// 组件卸载时自动移除监听器
ipcRenderer.on('custom-event', (event, ...args) => {
  console.log(args)
})
```
