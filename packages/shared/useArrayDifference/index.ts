import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MaybeRefOrGetter } from '../utils'
import { toValue } from '../toValue'

function defaultComparator<T>(value: T, othVal: T) {
  return value === othVal
}

export function useArrayDifference<T>(list: MaybeRefOrGetter<T[]>, values: MaybeRefOrGetter<T[]>, key?: keyof T): ComputedRef<T[]>
export function useArrayDifference<T>(list: MaybeRefOrGetter<T[]>, values: MaybeRefOrGetter<T[]>, compareFn?: (value: T, othVal: T) => boolean): ComputedRef<T[]>

/**
 * 获取两个数组的差集的响应式结果
 * @see https://vueuse.org/useArrayDifference
 * @returns - 两个数组的差集
 * @param args
 */
export function useArrayDifference<T>(...args: any[]): ComputedRef<T[]> {
  const list: MaybeRefOrGetter<T[]> = args[0]
  const values: MaybeRefOrGetter<T[]> = args[1]
  let compareFn = args[2] ?? defaultComparator

  if (typeof compareFn === 'string') {
    const key = compareFn as keyof T
    compareFn = (value: T, othVal: T) => value[key] === othVal[key]
  }

  return computed(() => toValue(list).filter(x => toValue(values).findIndex(y => compareFn(x, y)) === -1))
}
