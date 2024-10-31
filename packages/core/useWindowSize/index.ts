import type { ConfigurableWindow } from '../_configurable'
import { tryOnMounted } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { useMediaQuery } from '../useMediaQuery'

export interface UseWindowSizeOptions extends ConfigurableWindow {
  /**
   * 初始宽度
   */
  initialWidth?: number
  /**
   * 初始高度
   */
  initialHeight?: number
  /**
   * 监听窗口 `orientationchange` 事件
   *
   * @default true
   */
  listenOrientation?: boolean

  /**
   * 是否包含滚动条在宽度和高度中
   * 仅当 `type` 为 `'inner'` 时有效
   *
   * @default true
   */
  includeScrollbar?: boolean

  /**
   * 使用 `window.innerWidth` 或 `window.outerWidth`
   *
   * @default 'inner'
   */
  type?: 'inner' | 'outer'
}

/**
 * 响应式窗口大小。
 *
 * @see https://vueuse.org/useWindowSize
 * @param options
 */
export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    window = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true,
    type = 'inner',
  } = options

  const width = ref(initialWidth)
  const height = ref(initialHeight)

  const update = () => {
    if (window) {
      if (type === 'outer') {
        width.value = window.outerWidth
        height.value = window.outerHeight
      }
      else if (includeScrollbar) {
        width.value = window.innerWidth
        height.value = window.innerHeight
      }
      else {
        width.value = window.document.documentElement.clientWidth
        height.value = window.document.documentElement.clientHeight
      }
    }
  }

  update()
  tryOnMounted(update)
  useEventListener('resize', update, { passive: true })

  if (listenOrientation) {
    const matches = useMediaQuery('(orientation: portrait)')
    watch(matches, () => update())
  }

  return { width, height }
}

export type UseWindowSizeReturn = ReturnType<typeof useWindowSize>
