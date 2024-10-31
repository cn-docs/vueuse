import type { Ref } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { customRef } from 'vue-demi'
import { toValue } from '../toValue'
import { tryOnScopeDispose } from '../tryOnScopeDispose'

/**
 * 一个在一段时间后将重置为默认值的 ref。
 *
 * @see https://vueuse.org/refAutoReset
 * @param defaultValue 将要设置的值。
 * @param afterMs      延迟时间 （以毫秒为单位）。
 */
export function refAutoReset<T>(defaultValue: MaybeRefOrGetter<T>, afterMs: MaybeRefOrGetter<number> = 10000): Ref<T> {
  return customRef<T>((track, trigger) => {
    let value: T = toValue(defaultValue)
    let timer: any

    const resetAfter = () =>
      setTimeout(() => {
        value = toValue(defaultValue)
        trigger()
      }, toValue(afterMs))

    tryOnScopeDispose(() => {
      clearTimeout(timer)
    })

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue
        trigger()

        clearTimeout(timer)
        timer = resetAfter()
      },
    }
  })
}

// alias
export { refAutoReset as autoResetRef }
