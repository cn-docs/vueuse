import type { MaybeRefOrGetter } from '@vueuse/shared'
import { ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeComputedElementRef } from '../unrefElement'
import type { UseIntersectionObserverOptions } from '../useIntersectionObserver'
import { defaultWindow } from '../_configurable'
import { useIntersectionObserver } from '../useIntersectionObserver'

export interface UseElementVisibilityOptions extends ConfigurableWindow, Pick<UseIntersectionObserverOptions, 'threshold'> {
  scrollTarget?: MaybeRefOrGetter<HTMLElement | undefined | null>
}

/**
 * 跟踪元素在视口中的可见性
 *
 * @see https://vueuse.org/useElementVisibility
 */
export function useElementVisibility(
  element: MaybeComputedElementRef,
  options: UseElementVisibilityOptions = {},
) {
  const { window = defaultWindow, scrollTarget, threshold = 0 } = options
  const elementIsVisible = ref(false)

  useIntersectionObserver(
    element,
    (intersectionObserverEntries) => {
      let isIntersecting = elementIsVisible.value

      // Get the latest value of isIntersecting based on the entry time
      let latestTime = 0
      for (const entry of intersectionObserverEntries) {
        if (entry.time >= latestTime) {
          latestTime = entry.time
          isIntersecting = entry.isIntersecting
        }
      }
      elementIsVisible.value = isIntersecting
    },
    {
      root: scrollTarget,
      window,
      threshold,
    },
  )

  return elementIsVisible
}
