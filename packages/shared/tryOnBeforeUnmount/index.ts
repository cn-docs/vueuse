import { onBeforeUnmount } from 'vue'
import { type Fn, getLifeCycleTarget } from '../utils'

/**
 * 如果在组件生命周期内，调用 onBeforeUnmount()，如果不是，不执行任何操作
 *
 * @param fn
 * @param target
 */
export function tryOnBeforeUnmount(fn: Fn, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance)
    onBeforeUnmount(fn, target)
}
