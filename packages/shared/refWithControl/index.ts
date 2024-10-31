import type { Fn } from '../utils'
import { customRef } from 'vue-demi'
import { extendRef } from '../extendRef'

export interface ControlledRefOptions<T> {
  /**
   * Ref 变化前的回调函数。
   *
   * 返回 `false` 可以取消变化。
   */
  onBeforeChange?: (value: T, oldValue: T) => void | boolean

  /**
   * Ref 变化后的回调函数
   *
   * 这个回调是同步发生的，与 `watch` 相比具有较少的开销
   */
  onChanged?: (value: T, oldValue: T) => void
}

/**
 * 对 ref 及其响应性进行细粒度控制。
 */
export function refWithControl<T>(
  initial: T,
  options: ControlledRefOptions<T> = {},
) {
  let source = initial
  let track: Fn
  let trigger: Fn

  const ref = customRef<T>((_track, _trigger) => {
    track = _track
    trigger = _trigger

    return {
      get() {
        return get()
      },
      set(v) {
        set(v)
      },
    }
  })

  function get(tracking = true) {
    if (tracking)
      track()
    return source
  }

  function set(value: T, triggering = true) {
    if (value === source)
      return

    const old = source
    if (options.onBeforeChange?.(value, old) === false)
      return // dismissed

    source = value

    options.onChanged?.(value, old)

    if (triggering)
      trigger()
  }

  /**
   * Get the value without tracked in the reactivity system
   */
  const untrackedGet = () => get(false)
  /**
   * Set the value without triggering the reactivity system
   */
  const silentSet = (v: T) => set(v, false)

  /**
   * Get the value without tracked in the reactivity system.
   *
   * Alias for `untrackedGet()`
   */
  const peek = () => get(false)

  /**
   * Set the value without triggering the reactivity system
   *
   * Alias for `silentSet(v)`
   */
  const lay = (v: T) => set(v, false)

  return extendRef(
    ref,
    {
      get,
      set,
      untrackedGet,
      silentSet,
      peek,
      lay,
    },
    { enumerable: true },
  )
}

/**
 * Alias for `refWithControl`
 */
export const controlledRef = refWithControl
