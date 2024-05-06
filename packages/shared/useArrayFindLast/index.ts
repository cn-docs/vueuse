import type { ComputedRef } from 'vue-demi'
import { computed } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { toValue } from '../toValue'

// Polyfill for node version < 18
function findLast<T>(arr: T[], cb: (element: T, index: number, array: T[]) => boolean): T | undefined {
  let index = arr.length
  while (index-- > 0) {
    if (cb(arr[index], index, arr))
      return arr[index]
  }
  return undefined
}

/**
 * 响应式 `Array.findLast`
 *
 * @see https://vueuse.org/useArrayFindLast
 * @param list - 被调用的数组。
 * @param fn - 用于测试每个元素的函数。
 *
 * @returns 数组中满足提供的测试函数的最后一个元素。否则，返回 undefined。
 */
export function useArrayFindLast<T>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  fn: (element: T, index: number, array: MaybeRefOrGetter<T>[]) => boolean,
): ComputedRef<T | undefined> {
  return computed(() =>
    toValue<T | undefined>(
      !Array.prototype.findLast
        ? findLast(toValue(list), (element, index, array) => fn(toValue(element), index, array))
        : toValue(list)
          .findLast((element, index, array) => fn(toValue(element), index, array)),
    ))
}
