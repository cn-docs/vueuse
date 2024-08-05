import { computed } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { toValue } from '../toValue'

export type DateLike = Date | number | string | undefined

export interface UseDateFormatOptions {
  /**
   * 用于 dd/ddd/dddd/MMM/MMMM 格式的语言环境
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
   */
  locales?: MaybeRefOrGetter<Intl.LocalesArgument>

  /**
   * 重新修改显示上午下午的方式的自定义函数
   *
   */
  customMeridiem?: (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => string
}

// eslint-disable-next-line regexp/no-misleading-capturing-group
const REGEX_PARSE = /* #__PURE__ */ /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[T\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/i
const REGEX_FORMAT = /* #__PURE__ */ /[YMDHhms]o|\[([^\]]+)\]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g

function defaultMeridiem(hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) {
  let m = (hours < 12 ? 'AM' : 'PM')
  if (hasPeriod)
    m = m.split('').reduce((acc, curr) => acc += `${curr}.`, '')
  return isLowercase ? m.toLowerCase() : m
}

function formatOrdinal(num: number) {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

export function formatDate(date: Date, formatStr: string, options: UseDateFormatOptions = {}) {
  const years = date.getFullYear()
  const month = date.getMonth()
  const days = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const day = date.getDay()
  const meridiem = options.customMeridiem ?? defaultMeridiem
  const matches: Record<string, () => string | number> = {
    Yo: () => formatOrdinal(years),
    YY: () => String(years).slice(-2),
    YYYY: () => years,
    M: () => month + 1,
    Mo: () => formatOrdinal(month + 1),
    MM: () => `${month + 1}`.padStart(2, '0'),
    MMM: () => date.toLocaleDateString(toValue(options.locales), { month: 'short' }),
    MMMM: () => date.toLocaleDateString(toValue(options.locales), { month: 'long' }),
    D: () => String(days),
    Do: () => formatOrdinal(days),
    DD: () => `${days}`.padStart(2, '0'),
    H: () => String(hours),
    Ho: () => formatOrdinal(hours),
    HH: () => `${hours}`.padStart(2, '0'),
    h: () => `${hours % 12 || 12}`.padStart(1, '0'),
    ho: () => formatOrdinal(hours % 12 || 12),
    hh: () => `${hours % 12 || 12}`.padStart(2, '0'),
    m: () => String(minutes),
    mo: () => formatOrdinal(minutes),
    mm: () => `${minutes}`.padStart(2, '0'),
    s: () => String(seconds),
    so: () => formatOrdinal(seconds),
    ss: () => `${seconds}`.padStart(2, '0'),
    SSS: () => `${milliseconds}`.padStart(3, '0'),
    d: () => day,
    dd: () => date.toLocaleDateString(toValue(options.locales), { weekday: 'narrow' }),
    ddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: 'short' }),
    dddd: () => date.toLocaleDateString(toValue(options.locales), { weekday: 'long' }),
    A: () => meridiem(hours, minutes),
    AA: () => meridiem(hours, minutes, false, true),
    a: () => meridiem(hours, minutes, true),
    aa: () => meridiem(hours, minutes, true, true),
  }
  return formatStr.replace(REGEX_FORMAT, (match, $1) => $1 ?? matches[match]?.() ?? match)
}

export function normalizeDate(date: DateLike) {
  if (date === null)
    return new Date(Number.NaN) // null is invalid
  if (date === undefined)
    return new Date()
  if (date instanceof Date)
    return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3]
        || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  return new Date(date)
}

/**
 * 根据传入的令牌字符串获取格式化日期。
 *
 * @see https://vueuse.org/useDateFormat
 * @param date - 要格式化的日期，可以是 `Date` 对象、时间戳或字符串
 * @param formatStr - 用于格式化日期的令牌组合
 * @param options - UseDateFormatOptions
 */

export function useDateFormat(date: MaybeRefOrGetter<DateLike>, formatStr: MaybeRefOrGetter<string> = 'HH:mm:ss', options: UseDateFormatOptions = {}) {
  return computed(() => formatDate(normalizeDate(toValue(date)), toValue(formatStr), options))
}

export type UseDateFormatReturn = ReturnType<typeof useDateFormat>
