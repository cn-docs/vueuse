// eslint-disable-next-line no-restricted-imports
import { nextTick, onMounted } from 'vue-demi'
import type { Fn } from '../utils'
import { getLifeCycleTarget } from '../utils'

/**
 * 如果在组件生命周期内，调用 onMounted()，如果不是，直接调用函数
 *
 * @param fn
 * @param sync 如果设置为 false，则会在 Vue 的下一个 tick 中运行
 * @param target
 */
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget()
  if (instance)
    onMounted(fn, target)
  else if (sync)
    fn()
  else
    nextTick(fn)
}
