import type { Ref, WatchSource } from 'vue-demi'
import type { ConfigurableFlushSync } from '../utils'
import { watch } from 'vue-demi'

export interface SyncRefsOptions extends ConfigurableFlushSync {
  /**
   * 深度监视
   *
   * @default false
   */
  deep?: boolean
  /**
   * 立即同步值
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * 将目标 ref 与源 ref 保持同步
 *
 * @param source 源 ref
 * @param targets 目标值
 */
export function syncRefs<T>(
  source: WatchSource<T>,
  targets: Ref<T> | Ref<T>[],
  options: SyncRefsOptions = {},
) {
  const {
    flush = 'sync',
    deep = false,
    immediate = true,
  } = options
  if (!Array.isArray(targets))
    targets = [targets]

  return watch(
    source,
    newValue => (targets as Ref<T>[]).forEach(target => target.value = newValue),
    { flush, deep, immediate },
  )
}
