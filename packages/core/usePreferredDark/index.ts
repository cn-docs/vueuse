import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

/**
 * 响应式深色主题偏好。
 *
 * @see https://vueuse.org/usePreferredDark
 * @param [options]
 */
export function usePreferredDark(options?: ConfigurableWindow) {
  return useMediaQuery('(prefers-color-scheme: dark)', options)
}
