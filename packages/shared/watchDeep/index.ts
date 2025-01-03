import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'
import { watch } from 'vue'
import type { MapOldSources, MapSources } from '../utils/types'

// overloads
export function watchDeep<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false,
>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: Omit<WatchOptions<Immediate>, 'deep'>
): WatchStopHandle

export function watchDeep<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: Omit<WatchOptions<Immediate>, 'deep'>
): WatchStopHandle

export function watchDeep<
  T extends object,
  Immediate extends Readonly<boolean> = false,
>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: Omit<WatchOptions<Immediate>, 'deep'>
): WatchStopHandle

/**
 * 使用 `{ deep: true }` 监听值的简写形式。
 *
 * @see https://vueuse.org/watchDeep
 */
export function watchDeep<T = any, Immediate extends Readonly<boolean> = false>(source: T | WatchSource<T>, cb: any, options?: Omit<WatchOptions<Immediate>, 'deep'>) {
  return watch(
    source as any,
    cb,
    {
      ...options,
      deep: true,
    },
  )
}
