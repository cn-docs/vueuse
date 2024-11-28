import type { EffectScope } from 'vue'
import { effectScope } from 'vue'
import type { AnyFn } from '../utils'
import { tryOnScopeDispose } from '../tryOnScopeDispose'

/**
 * 使可组合函数可用于多个 Vue 实例。
 *
 * @see https://vueuse.org/createSharedComposable
 */
export function createSharedComposable<Fn extends AnyFn>(composable: Fn): Fn {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }

  return <Fn>((...args) => {
    subscribers += 1
    if (!scope) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    tryOnScopeDispose(dispose)
    return state
  })
}
