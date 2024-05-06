// eslint-disable-next-line no-restricted-imports
import { unref } from 'vue-demi'
import type { AnyFn, MaybeRefOrGetter } from '../utils'

/**
 * 获取值、ref 或 getter 的值。
 */
export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unref(r)
}

/**
 * @deprecated use `toValue` instead
 */
export const resolveUnref = toValue
