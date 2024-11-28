import type { Pausable } from '@vueuse/shared'
import { tryOnScopeDispose } from '@vueuse/shared'
import { readonly, ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export interface UseRafFnCallbackArguments {
  /**
   * 当前帧与上一帧之间经过的时间。
   */
  delta: number

  /**
   * 自网页创建以来经过的时间。参见 {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin 时间起点}。
   */
  timestamp: DOMHighResTimeStamp
}

export interface UseRafFnOptions extends ConfigurableWindow {
  /**
   * 在创建时立即开始 requestAnimationFrame 循环。
   *
   * @default true
   */
  immediate?: boolean
  /**
   * 每秒执行函数的最大帧数。
   * 设置为 `undefined` 来禁用限制。
   *
   * @default undefined
   */
  fpsLimit?: number
}

/**
 * 在每次 `requestAnimationFrame` 上调用函数。具有暂停和恢复控制。
 *
 * @see https://vueuse.org/useRafFn
 * @param fn
 * @param options
 */
export function useRafFn(fn: (args: UseRafFnCallbackArguments) => void, options: UseRafFnOptions = {}): Pausable {
  const {
    immediate = true,
    fpsLimit = undefined,
    window = defaultWindow,
  } = options

  const isActive = ref(false)
  const intervalLimit = fpsLimit ? 1000 / fpsLimit : null
  let previousFrameTimestamp = 0
  let rafId: null | number = null

  function loop(timestamp: DOMHighResTimeStamp) {
    if (!isActive.value || !window)
      return

    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp

    const delta = timestamp - previousFrameTimestamp

    if (intervalLimit && delta < intervalLimit) {
      rafId = window.requestAnimationFrame(loop)
      return
    }

    previousFrameTimestamp = timestamp
    fn({ delta, timestamp })
    rafId = window.requestAnimationFrame(loop)
  }

  function resume() {
    if (!isActive.value && window) {
      isActive.value = true
      previousFrameTimestamp = 0
      rafId = window.requestAnimationFrame(loop)
    }
  }

  function pause() {
    isActive.value = false
    if (rafId != null && window) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  if (immediate)
    resume()

  tryOnScopeDispose(pause)

  return {
    isActive: readonly(isActive),
    pause,
    resume,
  }
}
