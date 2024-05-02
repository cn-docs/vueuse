import type { DebounceFilterOptions, FunctionArgs, MaybeRefOrGetter, PromisifyFn } from '../utils'
import { createFilterWrapper, debounceFilter } from '../utils'

/**
 * 延迟执行函数。
 *
 * @see https://vueuse.org/useDebounceFn
 * @param  fn          要在延迟毫秒后执行的函数。
 * @param  ms          毫秒为单位的延迟时间，必须为零或更大。对于事件回调，最有用的值大约为 100 或 250（甚至更高）。
 * @param  options     选项
 *
 * @return 一个新的延迟函数。
 */
export function useDebounceFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {},
): PromisifyFn<T> {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn,
  )
}
