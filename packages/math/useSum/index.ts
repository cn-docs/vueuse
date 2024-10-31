import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef } from 'vue-demi'
import type { MaybeComputedRefArgs } from '../utils'
import { computed } from 'vue-demi'
import { toValueArgsFlat } from '../utils'

export function useSum(array: MaybeRefOrGetter<MaybeRefOrGetter<number>[]>): ComputedRef<number>
export function useSum(...args: MaybeRefOrGetter<number>[]): ComputedRef<number>

/**
 * 获取一组数字的总和。
 *
 * @see https://vueuse.org/useSum
 */
export function useSum(...args: MaybeComputedRefArgs<number>): ComputedRef<number> {
  return computed(() => toValueArgsFlat(args).reduce((sum, v) => sum += v, 0))
}
