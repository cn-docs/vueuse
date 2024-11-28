import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MaybeComputedRefArgs } from '../utils'
import { toValueArgsFlat } from '../utils'

export function useMax(array: MaybeRefOrGetter<MaybeRefOrGetter<number>[]>): ComputedRef<number>
export function useMax(...args: MaybeRefOrGetter<number>[]): ComputedRef<number>

/**
 * 响应式的获取最大值。
 *
 * @see https://vueuse.org/useMax
 */
export function useMax(...args: MaybeComputedRefArgs<number>) {
  return computed<number>(() => {
    const array = toValueArgsFlat(args)
    return Math.max(...array)
  })
}
