import { computed } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { useMediaQuery } from '../useMediaQuery'

export type ColorSchemeType = 'dark' | 'light' | 'no-preference'

/**
 * 响应式首选颜色方案媒体查询。
 *
 * @see https://vueuse.org/usePreferredColorScheme
 * @param [options]
 */
export function usePreferredColorScheme(options?: ConfigurableWindow) {
  const isLight = useMediaQuery('(prefers-color-scheme: light)', options)
  const isDark = useMediaQuery('(prefers-color-scheme: dark)', options)

  return computed<ColorSchemeType>(() => {
    if (isDark.value)
      return 'dark'
    if (isLight.value)
      return 'light'
    return 'no-preference'
  })
}
