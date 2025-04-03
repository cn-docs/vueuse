/* This implementation is original ported from https://github.com/shorwood/pompaute by Stanley Horwood */

import type { MaybeRef } from 'vue'
import { toValue } from 'vue'

export type UnrefFn<T> = T extends (...args: infer A) => infer R
  ? (...args: { [K in keyof A]: MaybeRef<A[K]> }) => R
  : never

/**
 * 创建一个普通函数，接受 ref 和原始值作为参数。
 * 返回与未转换函数返回相同的值，具有正确的类型。
 */
export function createUnrefFn<T extends Function>(fn: T): UnrefFn<T> {
  return function (this: any, ...args: any[]) {
    return fn.apply(this, args.map(i => toValue(i)))
  } as UnrefFn<T>
}
