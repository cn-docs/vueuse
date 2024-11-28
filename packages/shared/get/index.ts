// eslint-disable-next-line no-restricted-imports
import { unref } from 'vue'
import type { MaybeRef } from '../utils'

/**
 * 访问 `ref.value` 的简写方式
 */
export function get<T>(ref: MaybeRef<T>): T
export function get<T, K extends keyof T>(ref: MaybeRef<T>, key: K): T[K]

export function get(obj: MaybeRef<any>, key?: string | number | symbol) {
  if (key == null)
    return unref(obj)
  return unref(obj)[key]
}
