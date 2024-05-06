---
category: '@Electron'
---

# useIpcRendererInvoke

响应式的 [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) 结果。使异步操作看起来像同步的。

## 用法

```ts
import { useIpcRendererInvoke } from '@vueuse/electron'

// 如果没有明确提供 ipcRenderer，则需要启用 nodeIntegration
// @see: https://www.electronjs.org/docs/api/webview-tag#nodeintegration
// Ref 结果将返回
const result = useIpcRendererInvoke<string>('custom-channel', 'some data')
const msg = computed(() => result.value?.msg)
```
