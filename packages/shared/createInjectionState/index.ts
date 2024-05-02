import type { InjectionKey } from 'vue-demi'
import { provideLocal } from '../provideLocal'
import { injectLocal } from '../injectLocal'

export interface CreateInjectionStateOptions<Return> {
  /**
   * 自定义注入状态的 injectionKey
   */
  injectionKey?: string | InjectionKey<Return>
}

/**
 * 创建可以注入到组件中的全局状态。
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
export function createInjectionState<Arguments extends Array<any>, Return>(
  composable: (...args: Arguments) => Return,
  options?: CreateInjectionStateOptions<Return>,
): readonly [useProvidingState: (...args: Arguments) => Return, useInjectedState: () => Return | undefined] {
  const key: string | InjectionKey<Return> = options?.injectionKey || Symbol(composable.name || 'InjectionState')
  const useProvidingState = (...args: Arguments) => {
    const state = composable(...args)
    provideLocal(key, state)
    return state
  }
  const useInjectedState = () => injectLocal(key)
  return [useProvidingState, useInjectedState]
}
