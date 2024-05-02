import type { UnwrapNestedRefs } from 'vue-demi'
import { computed } from 'vue-demi'
import { toReactive } from '../toReactive'

/**
 * 计算响应式对象。
 */
export function reactiveComputed<T extends object>(fn: () => T): UnwrapNestedRefs<T> {
  return toReactive(computed(fn))
}
