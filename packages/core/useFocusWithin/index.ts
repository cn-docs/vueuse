import type { ComputedRef } from 'vue-demi'
import { computed } from 'vue-demi'
import type { MaybeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import { useActiveElement } from '../useActiveElement'
import type { ConfigurableWindow } from '../_configurable'

export interface UseFocusWithinReturn {
  /**
   * 如果该元素或其任何子元素获得焦点，则为 true
   */
  focused: ComputedRef<boolean>
}

/**
 * 跟踪焦点是否包含在目标元素内
 *
 * @see https://vueuse.org/useFocusWithin
 * @param target The target element to track
 * @param options Focus within options
 */
export function useFocusWithin(target: MaybeElementRef, options: ConfigurableWindow = {}): UseFocusWithinReturn {
  const activeElement = useActiveElement(options)
  const targetElement = computed(() => unrefElement(target))
  const focused = computed(() => (targetElement.value && activeElement.value) ? targetElement.value.contains(activeElement.value) : false)

  return { focused }
}
