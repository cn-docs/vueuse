import type { ComputedRef } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { computed } from 'vue-demi'
import { toValue } from '../toValue'

/**
 * 将 ref 转换为字符串。
 *
 * @see https://vueuse.org/useToString
 */
export function useToString(
  value: MaybeRefOrGetter<unknown>,
): ComputedRef<string> {
  return computed(() => `${toValue(value)}`)
}
