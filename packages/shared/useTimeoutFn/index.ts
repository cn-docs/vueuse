import type { AnyFn, MaybeRefOrGetter, Stoppable } from '../utils'
import { readonly, ref } from 'vue-demi'
import { toValue } from '../toValue'
import { tryOnScopeDispose } from '../tryOnScopeDispose'
import { isClient } from '../utils'

export interface UseTimeoutFnOptions {
  /**
   * 在调用此函数后立即启动计时器
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * 带有控制选项的 setTimeout 函数的封装
 *
 * @param cb 回调函数
 * @param interval 延迟的时间（毫秒）
 * @param options 可选参数
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {},
): Stoppable<Parameters<CallbackFn> | []> {
  const {
    immediate = true,
  } = options

  const isPending = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null

      cb(...args)
    }, toValue(interval))
  }

  if (immediate) {
    isPending.value = true
    if (isClient)
      start()
  }

  tryOnScopeDispose(stop)

  return {
    isPending: readonly(isPending),
    start,
    stop,
  }
}
