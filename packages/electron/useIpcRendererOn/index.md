---
category: '@Electron'
---

# useIpcRendererOn

轻松使用 [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener)，并在组件卸载时自动移除监听器 [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener)。

## 用法

```ts
import { useIpcRendererOn } from '@vueuse/electron'

// 如果没有显式提供 ipcRenderer，请启用 nodeIntegration
// 参见：https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// 在组件卸载时自动移除监听器
useIpcRendererOn('custom-event', (event, ...args) => {
  console.log(args)
})
```
