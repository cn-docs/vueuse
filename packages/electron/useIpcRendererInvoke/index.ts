import type { IpcRenderer } from 'electron'
import type { Ref } from 'vue-demi'
import { shallowRef } from 'vue-demi'

/**
 * 返回 Promise<any> - 解析为来自主进程的响应。
 *
 * 通过频道发送消息到主进程，并期待结果 ~~异步~~。作为组合 API，它使得异步操作看起来像同步的。
 *
 * 您需要为此函数提供 `ipcRenderer`。
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 * @see https://vueuse.org/useIpcRendererInvoke
 */
export function useIpcRendererInvoke<T>(ipcRenderer: IpcRenderer, channel: string, ...args: any[]): Ref<T | null>

/**
 * 返回 Promise<any> - 解析为来自主进程的响应。
 *
 * 通过频道发送消息到主进程，并期待结果 ~~异步~~。作为组合 API，它使得异步操作看起来像同步的。
 *
 * `ipcRenderer` 将自动获取。
 *
 * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
 * @see https://vueuse.org/useIpcRendererInvoke
 */
export function useIpcRendererInvoke<T>(channel: string, ...args: any[]): Ref<T | null>

export function useIpcRendererInvoke<T>(...args: any[]): Ref<T | null> {
  let ipcRenderer: IpcRenderer | undefined
  let channel: string
  let invokeArgs: any[]

  if (typeof args[0] === 'string') {
    [channel, ...invokeArgs] = args
    ipcRenderer = window.require ? window.require('electron').ipcRenderer : undefined
  }
  else {
    [ipcRenderer, channel, ...invokeArgs] = args
  }

  if (!ipcRenderer)
    throw new Error('please provide IpcRenderer module or enable nodeIntegration')

  const result = shallowRef<T | null>(null)

  ipcRenderer.invoke(channel, ...invokeArgs).then((response) => {
    result.value = response
  })

  return result
}
