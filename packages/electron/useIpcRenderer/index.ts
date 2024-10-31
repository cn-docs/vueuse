import type { IpcRenderer, IpcRendererEvent } from 'electron'
import type { Ref } from 'vue-demi'
import type { IpcRendererListener } from '../_types'
import { shallowRef } from 'vue-demi'
import { useIpcRendererInvoke } from '../useIpcRendererInvoke'
import { useIpcRendererOn } from '../useIpcRendererOn'

/**
 * useIpcRenderer 返回的结果
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer
 */
export interface UseIpcRendererReturn {
  /**
   * 监听频道，当新消息到达时，调用监听器 listener(event, args...)。
   * 在卸载时自动 [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener)。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
   */
  on: (channel: string, listener: IpcRendererListener) => IpcRenderer

  /**
   * 添加一次性监听器函数到事件上。当事件被触发时，监听器会被调用一次，然后被移除。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereroncechannel-listener
   */
  once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => IpcRenderer

  /**
   * 从监听器数组中移除指定的监听器。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener
   */
  removeListener: (channel: string, listener: (...args: any[]) => void) => IpcRenderer

  /**
   * 移除所有监听器，或指定频道的所有监听器。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovealllistenerschannel
   */
  removeAllListeners: (channel: string) => IpcRenderer

  /**
   * 通过频道异步发送消息到主进程，附带参数。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendchannel-args
   */
  send: (channel: string, ...args: any[]) => void

  /**
   * 返回 Promise<any> - 解析为来自主进程的响应。
   * 通过频道发送消息到主进程，并异步期待结果。
   * 作为组合 API，它使得异步操作看起来像同步的。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
   */
  invoke: <T>(channel: string, ...args: any[]) => Ref<T | null>

  /**
   * 返回 any - 由 ipcMain 处理程序返回的值。
   * 通过频道发送消息到主进程，并同步期待结果。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendsyncchannel-args
   */
  sendSync: <T>(channel: string, ...args: any[]) => Ref<T | null>

  /**
   * 发送消息到主进程，可选择传输零个或多个 MessagePort 对象的所有权。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer
   */
  postMessage: (channel: string, message: any, transfer?: MessagePort[]) => void

  /**
   * 通过频道将消息发送到具有 webContentsId 的窗口。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtowebcontentsid-channel-args
   */
  sendTo: (webContentsId: number, channel: string, ...args: any[]) => void

  /**
   * 类似 ipcRenderer.send，但事件将被发送到主页中的 <webview> 元素，而不是主进程。
   *
   * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtohostchannel-args
   */
  sendToHost: (channel: string, ...args: any[]) => void
}

/**
 * 创建一个 `sendSync` 函数
 */
function setSendSync(ipcRenderer: IpcRenderer) {
  return <T>(channel: string, ...args: any[]): Ref<T | null> => {
    const result = shallowRef<T | null>(null) as Ref<T | null>
    result.value = ipcRenderer.sendSync(channel, ...args)
    return result
  }
}

/**
 * 获取 `ipcRenderer` 模块及其所有 API。
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendtohostchannel-args
 * @see https://vueuse.org/useIpcRenderer
 */
export function useIpcRenderer(ipcRenderer?: IpcRenderer): UseIpcRendererReturn {
  if (!ipcRenderer)
    ipcRenderer = window?.require('electron').ipcRenderer

  if (!ipcRenderer)
    throw new Error('provide IpcRenderer module or enable nodeIntegration')

  return {
    on: (channel: string, listener: IpcRendererListener) => useIpcRendererOn(channel, listener),
    once: ipcRenderer.once.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
    send: ipcRenderer.send,
    invoke: <T>(channel: string, ...args: any[]) => useIpcRendererInvoke<T>(ipcRenderer!, channel, ...args),
    sendSync: setSendSync(ipcRenderer),
    postMessage: ipcRenderer.postMessage,
    sendTo: ipcRenderer.sendTo,
    sendToHost: ipcRenderer.sendToHost,
  }
}
