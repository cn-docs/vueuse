import { isRef, ref, watch } from 'vue'
import type { Fn, MaybeRefOrGetter, Pausable } from '../utils'
import { toValue } from '../toValue'
import { tryOnScopeDispose } from '../tryOnScopeDispose'
import { isClient } from '../utils'

export interface UseIntervalFnOptions {
  /**
   * 立即开始计时器
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 在调用 `resume` 函数后立即执行回调函数
   *
   * @default false
   */
  immediateCallback?: boolean
}

/**
 * 带有控制功能的 `setInterval` 包装器
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(cb: Fn, interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalFnOptions = {}): Pausable {
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const isActive = ref(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    const intervalValue = toValue(interval)
    if (intervalValue <= 0)
      return
    isActive.value = true
    if (immediateCallback)
      cb()
    clean()
    if (isActive.value)
      timer = setInterval(cb, intervalValue)
  }

  if (immediate && isClient)
    resume()

  if (isRef(interval) || typeof interval === 'function') {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume()
    })
    tryOnScopeDispose(stopWatch)
  }

  tryOnScopeDispose(pause)

  return {
    isActive,
    pause,
    resume,
  }
}
