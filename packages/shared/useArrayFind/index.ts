import type { ComputedRef } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { computed } from 'vue-demi'
import { toValue } from '../toValue'

/**
 * 响应式 `Array.find`
 *
 * @see https://vueuse.org/useArrayFind
 * @param list - 被调用的数组。
 * @param fn - 用于测试每个元素的函数。
 *
 * @returns 数组中满足提供的测试函数的第一个元素。否则，返回 undefined。
 */
export function useArrayFind<T>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  fn: (element: T, index: number, array: MaybeRefOrGetter<T>[]) => boolean,
): ComputedRef<T | undefined> {
  return computed(() =>
    toValue<T | undefined>(
      toValue(list)
        .find((element, index, array) => fn(toValue(element), index, array)),
    ))
}
