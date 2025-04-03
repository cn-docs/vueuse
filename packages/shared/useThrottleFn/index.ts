import type { MaybeRefOrGetter } from 'vue'
import type { FunctionArgs, PromisifyFn } from '../utils'
import { createFilterWrapper, throttleFilter } from '../utils'

/**
 * 节流函数的执行。特别适用于对 resize 和 scroll 等事件的处理程序进行速率限制。
 *
 * @param   fn             一个将在延迟毫秒数后执行的函数。`this` 上下文和所有参数将按原样传递给节流函数执行时的 `callback`。
 * @param   ms             一个大于或等于零的延迟时间（以毫秒为单位）。对于事件回调，100 或 250（甚至更高）的值最有用。
 *                                    （默认值：200）
 *
 * @param [trailing] 如果为 true，时间结束后再次调用 fn（默认值：false）
 *
 * @param [leading] 如果为 true，在 ms 超时的前沿调用 fn（默认值：true）
 *
 * @param [rejectOnCancel] 如果为 true，取消最后一次调用时拒绝（默认值：false）
 *
 * @return  一个新的节流函数。
 */
export function useThrottleFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false,
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn,
  )
}
