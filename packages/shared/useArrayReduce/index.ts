import type { ComputedRef } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { computed } from 'vue-demi'
import { toValue } from '../toValue'

export type UseArrayReducer<PV, CV, R> = (previousValue: PV, currentValue: CV, currentIndex: number) => R

/**
 * 响应式 `Array.reduce`
 *
 * @see https://vueuse.org/useArrayReduce
 * @param list - 被调用的数组。
 * @param reducer - 一个“reducer”函数。
 *
 * @returns 在整个数组上运行“reducer”回调函数完成后的值。
 */
export function useArrayReduce<T>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  reducer: UseArrayReducer<T, T, T>,
): ComputedRef<T>

/**
 * 响应式 `Array.reduce`
 *
 * @see https://vueuse.org/useArrayReduce
 * @param list - 被调用的数组。
 * @param reducer - 一个“reducer”函数。
 * @param initialValue - 在第一次调用回调函数时初始化的值。
 *
 * @returns 在整个数组上运行“reducer”回调函数完成后的值。
 */
export function useArrayReduce<T, U>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  reducer: UseArrayReducer<U, T, U>,
  initialValue: MaybeRefOrGetter<U>,
): ComputedRef<U>

/**
 * 响应式 `Array.reduce`
 *
 * @see https://vueuse.org/useArrayReduce
 * @param list - 被调用的数组。
 * @param reducer - 一个“reducer”函数。
 * @param args
 *
 * @returns 在整个数组上运行“reducer”回调函数完成后的值。
 */
export function useArrayReduce<T>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  reducer: ((...p: any[]) => any),
  ...args: any[]
): ComputedRef<T> {
  const reduceCallback = (sum: any, value: any, index: number) => reducer(toValue(sum), toValue(value), index)

  return computed(() => {
    const resolved = toValue(list)
    // Depending on the behavior of reduce, undefined is also a valid initialization value,
    // and this code will distinguish the behavior between them.
    return args.length
      ? resolved.reduce(reduceCallback, typeof args[0] === 'function' ? toValue(args[0]()) : toValue(args[0]))
      : resolved.reduce(reduceCallback)
  })
}
