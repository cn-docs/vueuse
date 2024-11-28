/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import type { Ref } from 'vue'
import { readonly, ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'

export type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

export interface NetworkState {
  isSupported: Readonly<Ref<boolean>>
  /**
   * 用户当前是否连接到网络。
   */
  isOnline: Readonly<Ref<boolean>>
  /**
   * 用户上次连接到网络的时间。
   */
  offlineAt: Readonly<Ref<number | undefined>>
  /**
   * 在此时间点，如果用户处于离线状态并重新连接。
   */
  onlineAt: Readonly<Ref<number | undefined>>
  /**
   * 下载速度，以 Mbps 为单位。
   */
  downlink: Readonly<Ref<number | undefined>>
  /**
   * 可达到的最大下载速度，以 Mbps 为单位。
   */
  downlinkMax: Readonly<Ref<number | undefined>>
  /**
   * 检测到的有效速度类型。
   */
  effectiveType: Readonly<Ref<NetworkEffectiveType | undefined>>
  /**
   * 当前连接的预估往返时间。
   */
  rtt: Readonly<Ref<number | undefined>>
  /**
   * 用户是否启用了数据节省模式。
   */
  saveData: Readonly<Ref<boolean | undefined>>
  /**
   * 检测到的 connection/network 类型。
   */
  type: Readonly<Ref<NetworkType>>
}

/**
 * 响应式网络状态。
 *
 * @see https://vueuse.org/useNetwork
 * @param options
 */
export function useNetwork(options: ConfigurableWindow = {}): Readonly<NetworkState> {
  const { window = defaultWindow } = options
  const navigator = window?.navigator
  const isSupported = useSupported(() => navigator && 'connection' in navigator)

  const isOnline = ref(true)
  const saveData = ref(false)
  const offlineAt: Ref<number | undefined> = ref(undefined)
  const onlineAt: Ref<number | undefined> = ref(undefined)
  const downlink: Ref<number | undefined> = ref(undefined)
  const downlinkMax: Ref<number | undefined> = ref(undefined)
  const rtt: Ref<number | undefined> = ref(undefined)
  const effectiveType: Ref<NetworkEffectiveType> = ref(undefined)
  const type: Ref<NetworkType> = ref<NetworkType>('unknown')

  const connection = isSupported.value && (navigator as any).connection

  function updateNetworkInformation() {
    if (!navigator)
      return

    isOnline.value = navigator.onLine
    offlineAt.value = isOnline.value ? undefined : Date.now()
    onlineAt.value = isOnline.value ? Date.now() : undefined

    if (connection) {
      downlink.value = connection.downlink
      downlinkMax.value = connection.downlinkMax
      effectiveType.value = connection.effectiveType
      rtt.value = connection.rtt
      saveData.value = connection.saveData
      type.value = connection.type
    }
  }

  if (window) {
    useEventListener(window, 'offline', () => {
      isOnline.value = false
      offlineAt.value = Date.now()
    })

    useEventListener(window, 'online', () => {
      isOnline.value = true
      onlineAt.value = Date.now()
    })
  }

  if (connection)
    useEventListener(connection, 'change', updateNetworkInformation, false)

  updateNetworkInformation()

  return {
    isSupported: readonly(isSupported),
    isOnline: readonly(isOnline),
    saveData: readonly(saveData),
    offlineAt: readonly(offlineAt),
    onlineAt: readonly(onlineAt),
    downlink: readonly(downlink),
    downlinkMax: readonly(downlinkMax),
    effectiveType: readonly(effectiveType),
    rtt: readonly(rtt),
    type: readonly(type),
  }
}

export type UseNetworkReturn = ReturnType<typeof useNetwork>
