import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MaybeComputedRefArgs } from '../utils'
import { toValueArgsFlat } from '../utils'

export function useAverage(array: MaybeRefOrGetter<MaybeRefOrGetter<number>[]>): ComputedRef<number>
export function useAverage(...args: MaybeRefOrGetter<number>[]): ComputedRef<number>

/**
 * 响应式地获取数组的平均值。
 *
 * @see https://vueuse.org/useAverage
 */
export function useAverage(...args: MaybeComputedRefArgs<number>): ComputedRef<number> {
  return computed(() => {
    const array = toValueArgsFlat(args)
    return array.reduce((sum, v) => sum += v, 0) / array.length
  })
}
