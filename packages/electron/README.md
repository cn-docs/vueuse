# @vueuse/electron

[![NPM version](https://img.shields.io/npm/v/@vueuse/electron?color=a1b858)](https://www.npmjs.com/package/@vueuse/electron)

> This is an add-on of [VueUse](https://github.com/vueuse/vueuse), enables electron renderer process API as Composition API.

## Install

```bash
npm i @vueuse/electron electron
```

## Functions

`@vueuse/electron` provides the following functions

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--FUNCTIONS_LIST_STARTS-->

- [`useIpcRenderer`](https://vueuse.org/electron/useIpcRenderer/) — 提供 [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 及其所有 API。
- [`useIpcRendererInvoke`](https://vueuse.org/electron/useIpcRendererInvoke/) — 响应式的 [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) 结果。使异步操作看起来像同步的。
- [`useIpcRendererOn`](https://vueuse.org/electron/useIpcRendererOn/) — 轻松使用 [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener)，并在组件卸载时自动移除监听器 [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener)。
- [`useZoomFactor`](https://vueuse.org/electron/useZoomFactor/) — 响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放因子。
- [`useZoomLevel`](https://vueuse.org/electron/useZoomLevel/) — 响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放级别。

<!--FUNCTIONS_LIST_ENDS-->

## License

[MIT License](https://github.com/vueuse/vueuse/blob/master/LICENSE) © 2021-PRESENT [Archer Gu](https://github.com/ArcherGu)
