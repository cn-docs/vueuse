import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { MaybeRefOrGetter } from '../utils'
import { toValue } from '../toValue'

/**
 * 响应式 `Array.join`
 *
 * @see https://vueuse.org/useArrayJoin
 * @param list - 被调用的数组。
 * @param separator - 用于分隔数组中每对相邻元素的字符串。如果省略，则使用逗号（","）分隔数组元素。
 *
 * @returns 包含所有数组元素连接的字符串。如果 arr.length 为 0，则返回空字符串。
 */
export function useArrayJoin(
  list: MaybeRefOrGetter<MaybeRefOrGetter<any>[]>,
  separator?: MaybeRefOrGetter<string>,
): ComputedRef<string> {
  return computed(() => toValue(list).map(i => toValue(i)).join(toValue(separator)))
}
