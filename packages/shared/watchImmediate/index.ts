import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue-demi'
import { watch } from 'vue-demi'

import type { MapOldSources, MapSources } from '../utils/types'

// overloads
export function watchImmediate<T extends Readonly<WatchSource<unknown>[]>>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, true>>,
  options?: Omit<WatchOptions<true>, 'immediate'>
): WatchStopHandle

export function watchImmediate<T>(
  source: WatchSource<T>,
  cb: WatchCallback<T, T | undefined>,
  options?: Omit<WatchOptions<true>, 'immediate'>
): WatchStopHandle

export function watchImmediate<T extends object>(
  source: T,
  cb: WatchCallback<T, T | undefined>,
  options?: Omit<WatchOptions<true>, 'immediate'>
): WatchStopHandle

/**
 * 使用 `{ immediate: true }` 监听值的简写形式。
 *
 * @see https://vueuse.org/watchImmediate
 */
export function watchImmediate<T = any>(source: T, cb: any, options?: Omit<WatchOptions, 'immediate'>) {
  return watch(
    source as any,
    cb,
    {
      ...options,
      immediate: true,
    },
  )
}
