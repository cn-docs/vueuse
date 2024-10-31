import type { Fn } from '../utils'
import { getCurrentScope, onScopeDispose } from 'vue-demi'

/**
 * 如果在效果范围生命周期内，调用 onScopeDispose()，如果不是，不执行任何操作
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
