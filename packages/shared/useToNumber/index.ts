import type { ComputedRef } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { computed } from 'vue-demi'
import { toValue } from '../toValue'

export interface UseToNumberOptions {
  /**
   * 用于将值转换为数字的方法。
   *
   * @default 'parseFloat'
   */
  method?: 'parseFloat' | 'parseInt'

  /**
   * 传递给 `parseInt` 的数学数字系统的基数。
   * 仅适用于 `method: 'parseInt'`
   */
  radix?: number

  /**
   * 将 NaN 替换为零
   *
   * @default false
   */
  nanToZero?: boolean
}

/**
 * 将字符串 ref 转换为数字。
 */
export function useToNumber(
  value: MaybeRefOrGetter<number | string>,
  options: UseToNumberOptions = {},
): ComputedRef<number> {
  const {
    method = 'parseFloat',
    radix,
    nanToZero,
  } = options

  return computed(() => {
    let resolved = toValue(value)
    if (typeof resolved === 'string')
      resolved = Number[method](resolved, radix)
    if (nanToZero && Number.isNaN(resolved))
      resolved = 0
    return resolved
  })
}
