import type { ComputedRef, Ref } from 'vue'
import { tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'
import { computed, ref, shallowRef, watch } from 'vue'
import type { ConfigurableNavigator } from '../_configurable'

import { defaultNavigator } from '../_configurable'
import { useSupported } from '../useSupported'

export interface UseBluetoothRequestDeviceOptions {
  /**
   *
   * BluetoothScanFilters 的数组。此过滤器由 BluetoothServiceUUIDs 数组、名称参数和名称前缀参数组成。
   *
   */
  filters?: BluetoothLEScanFilter[] | undefined
  /**
   *
   * BluetoothServiceUUIDs 的数组。
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/BluetoothRemoteGATTService/uuid
   *
   */
  optionalServices?: BluetoothServiceUUID[] | undefined
}

export interface UseBluetoothOptions extends UseBluetoothRequestDeviceOptions, ConfigurableNavigator {
  /**
   *
   * 一个布尔值，指示请求脚本是否可以接受所有蓝牙设备。默认值为 false。
   *
   * !! 这可能导致选择器中显示大量无关的设备，并因为没有过滤器而浪费能量。
   *
   *
   * 使用时要谨慎。
   *
   * @default false
   *
   */
  acceptAllDevices?: boolean
}

export function useBluetooth(options?: UseBluetoothOptions): UseBluetoothReturn {
  let {
    acceptAllDevices = false,
  } = options || {}

  const {
    filters = undefined,
    optionalServices = undefined,
    navigator = defaultNavigator,
  } = options || {}

  const isSupported = useSupported(() => navigator && 'bluetooth' in navigator)

  const device = shallowRef<undefined | BluetoothDevice>(undefined)

  const error = shallowRef<unknown | null>(null)

  watch(device, () => {
    connectToBluetoothGATTServer()
  })

  async function requestDevice(): Promise<void> {
    // This is the function can only be called if Bluetooth API is supported:
    if (!isSupported.value)
      return

    // Reset any errors we currently have:
    error.value = null

    // If filters specified, we need to ensure we  don't accept all devices:
    if (filters && filters.length > 0)
      acceptAllDevices = false

    try {
      device.value = await navigator?.bluetooth.requestDevice({
        acceptAllDevices,
        filters,
        optionalServices,
      })
    }
    catch (err) {
      error.value = err
    }
  }

  const server = ref<undefined | BluetoothRemoteGATTServer>()

  const isConnected = computed((): boolean => {
    return server.value?.connected || false
  })

  async function connectToBluetoothGATTServer() {
    // Reset any errors we currently have:
    error.value = null

    if (device.value && device.value.gatt) {
      // Add callback to gattserverdisconnected event:
      device.value.addEventListener('gattserverdisconnected', () => {})

      try {
        // Connect to the device:
        server.value = await device.value.gatt.connect()
      }
      catch (err) {
        error.value = err
      }
    }
  }

  tryOnMounted(() => {
    if (device.value)
      device.value.gatt?.connect()
  })

  tryOnScopeDispose(() => {
    if (device.value)
      device.value.gatt?.disconnect()
  })

  return {
    isSupported,
    isConnected,
    // Device:
    device,
    requestDevice,
    // Server:
    server,
    // Errors:
    error,
  }
}

export interface UseBluetoothReturn {
  isSupported: Ref<boolean>
  isConnected: ComputedRef<boolean>
  device: Ref<BluetoothDevice | undefined>
  requestDevice: () => Promise<void>
  server: Ref<BluetoothRemoteGATTServer | undefined>
  error: Ref<unknown | null>
}
