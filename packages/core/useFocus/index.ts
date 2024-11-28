import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'

export interface UseFocusOptions extends ConfigurableWindow {
  /**
   * 初始值。如果设置为 true，则焦点将设置在目标上
   *
   * @default false
   */
  initialValue?: boolean

  /**
   * 复制 CSS 的 :focus-visible 行为
   *
   * @default false
   */
  focusVisible?: boolean

  /**
   * Prevent scrolling to the element when it is focused.
   *
   * @default false
   */
  preventScroll?: boolean
}

export interface UseFocusReturn {
  /**
   * 如果为 true，则表示元素具有焦点。如果为 false，则表示元素没有焦点
   * 如果设置为 true，则元素将获得焦点。如果设置为 false，则元素将失去焦点。
   */
  focused: Ref<boolean>
}

/**
 * 跟踪或设置 DOM 元素的焦点状态。
 *
 * @see https://vueuse.org/useFocus
 * @param target The target element for the focus and blur events.
 * @param options
 */
export function useFocus(target: MaybeElementRef, options: UseFocusOptions = {}): UseFocusReturn {
  const { initialValue = false, focusVisible = false, preventScroll = false } = options

  const innerFocused = ref(false)
  const targetElement = computed(() => unrefElement(target))

  useEventListener(targetElement, 'focus', (event) => {
    if (!focusVisible || (event.target as HTMLElement).matches?.(':focus-visible'))
      innerFocused.value = true
  })
  useEventListener(targetElement, 'blur', () => innerFocused.value = false)

  const focused = computed({
    get: () => innerFocused.value,
    set(value: boolean) {
      if (!value && innerFocused.value)
        targetElement.value?.blur()
      else if (value && !innerFocused.value)
        targetElement.value?.focus({ preventScroll })
    },
  })

  watch(
    targetElement,
    () => {
      focused.value = initialValue
    },
    { immediate: true, flush: 'post' },
  )

  return { focused }
}
