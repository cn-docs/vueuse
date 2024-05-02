import type { FunctionArgs, MaybeRefOrGetter, PromisifyFn } from '../utils'
import { createFilterWrapper, throttleFilter } from '../utils'

/**
 * 节流执行函数。特别适用于限制事件处理程序在调整大小和滚动等事件上的执行频率。
 *
 * @param   fn             在延迟毫秒后执行的函数。在执行节流函数时，`this` 上下文和所有参数都原样传递到回调函数中。
 * @param   ms             毫秒为单位的延迟时间，必须为零或更大。对于事件回调，最有用的值大约为 100 或 250（甚至更高）。
 *
 * @param [trailing] 如果为 true，在时间结束后再次调用 fn
 *
 * @param [leading] 如果为 true，在 ms 超时的起始边缘调用 fn
 *
 * @param [rejectOnCancel] 如果为 true，如果上次调用已被取消，则拒绝最后一次调用
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
