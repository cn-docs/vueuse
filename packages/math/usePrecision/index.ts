import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef } from 'vue-demi'
import { toValue } from '@vueuse/shared'
import { computed } from 'vue-demi'

/**
 * 处理数值精度的准确性。
 *
 * @param value - 值
 * @param power - 幂
 * @returns 将值与幂相乘的结果
 */
function accurateMultiply(value: number, power: number): number {
  const valueStr = value.toString()

  if (value > 0 && valueStr.includes('.')) {
    const decimalPlaces = valueStr.split('.')[1].length
    const multiplier = 10 ** decimalPlaces

    return (value * multiplier * power) / multiplier
  }
  else {
    return value * power
  }
}

export interface UsePrecisionOptions {
  /**
   * Method to use for rounding
   *
   * @default 'round'
   */
  math?: 'floor' | 'ceil' | 'round'
}

/**
 * Reactively set the precision of a number.
 *
 * @see https://vueuse.org/usePrecision
 */
export function usePrecision(
  value: MaybeRefOrGetter<number>,
  digits: MaybeRefOrGetter<number>,
  options?: MaybeRefOrGetter<UsePrecisionOptions>,
): ComputedRef<number> {
  return computed<number>(() => {
    const _value = toValue(value)
    const _digits = toValue(digits)
    const power = 10 ** _digits
    return Math[toValue(options)?.math || 'round'](accurateMultiply(_value, power)) / power
  })
}
