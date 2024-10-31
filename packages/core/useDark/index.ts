import type { BasicColorSchema, UseColorModeOptions } from '../useColorMode'
import { computed } from 'vue-demi'
import { defaultWindow } from '../_configurable'
import { useColorMode } from '../useColorMode'
import { usePreferredDark } from '../usePreferredDark'

export interface UseDarkOptions extends Omit<UseColorModeOptions<BasicColorSchema>, 'modes' | 'onChanged'> {
  /**
   * 当 isDark=true 时应用于目标元素的值
   *
   * @default 'dark'
   */
  valueDark?: string

  /**
   * 当 isDark=false 时应用于目标元素的值
   *
   * @default ''
   */
  valueLight?: string

  /**
   * 自定义处理更新的处理程序。
   * 当指定时，将覆盖默认行为。
   *
   * @default undefined
   */
  onChanged?: (isDark: boolean, defaultHandler: ((mode: BasicColorSchema) => void), mode: BasicColorSchema) => void
}

/**
 * 响应式暗模式，自动数据持久化。
 *
 * @see https://vueuse.org/useDark
 * @param options
 */
export function useDark(options: UseDarkOptions = {}) {
  const {
    valueDark = 'dark',
    valueLight = '',
    window = defaultWindow,
  } = options

  const mode = useColorMode({
    ...options,
    onChanged: (mode, defaultHandler) => {
      if (options.onChanged)
        options.onChanged?.(mode === 'dark', defaultHandler, mode)
      else
        defaultHandler(mode)
    },
    modes: {
      dark: valueDark,
      light: valueLight,
    },
  })

  const system = computed(() => {
    if (mode.system) {
      return mode.system.value
    }
    else {
      // In Vue 2.6, ref not be extensible, mode.system is undefined
      const preferredDark = usePreferredDark({ window })
      return preferredDark.value ? 'dark' : 'light'
    }
  })

  const isDark = computed<boolean>({
    get() {
      return mode.value === 'dark'
    },
    set(v) {
      const modeVal = v ? 'dark' : 'light'
      if (system.value === modeVal)
        mode.value = 'auto'
      else
        mode.value = modeVal
    },
  })

  return isDark
}
