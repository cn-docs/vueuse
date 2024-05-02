import type { WatchCallback, WatchOptions, WatchSource } from 'vue-demi'
import { nextTick, watch } from 'vue-demi'

export interface WheneverOptions extends WatchOptions {
  /**
   * 当条件满足时仅触发一次
   *
   * 覆盖 `WatchOptions` 中的 `once` 选项
   *
   * @default false
   */
  once?: boolean
}

/**
 * 监视值为真的简写形式
 *
 * @see https://vueuse.org/whenever
 */
export function whenever<T>(source: WatchSource<T | false | null | undefined>, cb: WatchCallback<T>, options?: WheneverOptions) {
  const stop = watch(
    source,
    (v, ov, onInvalidate) => {
      if (v) {
        if (options?.once)
          nextTick(() => stop())
        cb(v, ov, onInvalidate)
      }
    },
    {
      ...options,
      once: false,
    } as WatchOptions,
  )
  return stop
}
