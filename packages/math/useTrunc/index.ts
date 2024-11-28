import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef } from 'vue'
import { toValue } from '@vueuse/shared'
import { computed } from 'vue'

/**
 * 响应式 `Math.trunc`.
 *
 * @see https://vueuse.org/useTrunc
 */
export function useTrunc(value: MaybeRefOrGetter<number>): ComputedRef<number> {
  return computed<number>(() => Math.trunc(toValue(value)))
}
