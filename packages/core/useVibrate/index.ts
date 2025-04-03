import type { Pausable } from '@vueuse/shared'
import type { MaybeRefOrGetter } from 'vue'
import type { ConfigurableNavigator } from '../_configurable'
import { toRef, useIntervalFn } from '@vueuse/shared'
import { defaultNavigator } from '../_configurable'
import { useSupported } from '../useSupported'

export interface UseVibrateOptions extends ConfigurableNavigator {
  /**
   *
   * 一个值数组描述了设备震动和不震动的交替周期。
   * 数组中的每个值都被转换为整数，然后交替解释为设备应该震动的毫秒数和不应该震动的毫秒数。
   *
   * @default []
   *
   */
  pattern?: MaybeRefOrGetter<number[] | number>
  /**
   * 持续震动的间隔，以毫秒为单位
   *
   * 设置为 `0` 表示禁用
   *
   * @default 0
   *
   */
  interval?: number
}

/**
 * 响应式震动
 *
 * @see https://vueuse.org/useVibrate
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
 * @param options
 */
export function useVibrate(options?: UseVibrateOptions) {
  const {
    pattern = [],
    interval = 0,
    navigator = defaultNavigator,
  } = options || {}

  const isSupported = useSupported(() => typeof navigator !== 'undefined' && 'vibrate' in navigator)

  const patternRef = toRef(pattern)
  let intervalControls: Pausable | undefined

  const vibrate = (pattern = patternRef.value) => {
    if (isSupported.value)
      navigator!.vibrate(pattern)
  }

  // Attempt to stop the vibration:
  const stop = () => {
    // Stope the vibration if we need to:
    if (isSupported.value)
      navigator!.vibrate(0)
    intervalControls?.pause()
  }

  if (interval > 0) {
    intervalControls = useIntervalFn(
      vibrate,
      interval,
      {
        immediate: false,
        immediateCallback: false,
      },
    )
  }

  return {
    isSupported,
    pattern,
    intervalControls,
    vibrate,
    stop,
  }
}

export type UseVibrateReturn = ReturnType<typeof useVibrate>
