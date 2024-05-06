import type { Ref } from 'vue-demi'
import { ref, watch } from 'vue-demi'
import { useThrottleFn } from '../useThrottleFn'

/**
 * 函数节流，特别适用于限制像 resize 和 scroll 这样的事件处理程序的执行频率。
 *
 * @param value 要使用节流效果监视的 Ref 值
 * @param delay 以毫秒为单位的延迟时间，必须是大于或等于零的值。对于事件回调，最有用的值通常在 100 或 250（甚至更高）左右。
 * @param [trailing] 如果为 true，在延迟时间结束后再次更新值
 * @param [leading] 如果为 true，在 ms 超时的头部立即更新值
 */
export function refThrottled<T>(value: Ref<T>, delay = 200, trailing = true, leading = true) {
  if (delay <= 0)
    return value

  const throttled: Ref<T> = ref(value.value as T) as Ref<T>

  const updater = useThrottleFn(() => {
    throttled.value = value.value
  }, delay, trailing, leading)

  watch(value, () => updater())

  return throttled
}

// alias
export {
  refThrottled as useThrottle,
  refThrottled as throttledRef,
}
