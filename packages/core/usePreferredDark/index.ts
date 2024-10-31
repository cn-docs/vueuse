import type { ConfigurableWindow } from '../_configurable'
import { useMediaQuery } from '../useMediaQuery'

/**
 * 响应式深色主题偏好。
 *
 * @see https://vueuse.org/usePreferredDark
 * @param [options]
 */
export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
