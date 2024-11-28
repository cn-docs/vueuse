import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'

/**
 * 使用 `window.onfocus` 和 `window.onblur` 响应式跟踪窗口焦点。
 *
 * @see https://vueuse.org/useWindowFocus
 */
export function useWindowFocus(options: ConfigurableWindow = {}): Ref<boolean> {
  const { window = defaultWindow } = options
  if (!window)
    return ref(false)

  const focused = ref(window.document.hasFocus())

  useEventListener(window, 'blur', () => {
    focused.value = false
  })

  useEventListener(window, 'focus', () => {
    focused.value = true
  })

  return focused
}
