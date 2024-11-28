import { computed } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { useMediaQuery } from '../useMediaQuery'

export type ReducedMotionType = 'reduce' | 'no-preference'

/**
 *  响应式动画偏好媒体查询
 *
 * @see https://vueuse.org/usePreferredReducedMotion
 * @param [options]
 */
export function usePreferredReducedMotion(options?: ConfigurableWindow) {
  const isReduced = useMediaQuery('(prefers-reduced-motion: reduce)', options)

  return computed<ReducedMotionType>(() => {
    if (isReduced.value)
      return 'reduce'
    return 'no-preference'
  })
}
