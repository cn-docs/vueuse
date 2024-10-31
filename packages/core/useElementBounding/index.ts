import type { MaybeComputedElementRef } from '../unrefElement'
import { tryOnMounted } from '@vueuse/shared'
import { ref, watch } from 'vue-demi'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import { useMutationObserver } from '../useMutationObserver'
import { useResizeObserver } from '../useResizeObserver'

export interface UseElementBoundingOptions {
  /**
   * 在组件卸载时将值重置为 0
   *
   * @default true
   */
  reset?: boolean

  /**
   * 监听窗口大小调整事件
   *
   * @default true
   */
  windowResize?: boolean
  /**
   * 监听窗口滚动事件
   *
   * @default true
   */
  windowScroll?: boolean

  /**
   * 组件挂载时立即调用更新
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Timing to recalculate the bounding box
   *
   * Setting to `next-frame` can be useful when using this together with something like {@link useBreakpoints}
   * and therefore the layout (which influences the bounding box of the observed element) is not updated on the current tick.
   *
   * @default 'sync'
   */
  updateTiming?: 'sync' | 'next-frame'
}

/**
 * HTML 元素的响应式边界框。
 *
 * @see https://vueuse.org/useElementBounding
 * @param target
 */
export function useElementBounding(
  target: MaybeComputedElementRef,
  options: UseElementBoundingOptions = {},
) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = 'sync',
  } = options

  const height = ref(0)
  const bottom = ref(0)
  const left = ref(0)
  const right = ref(0)
  const top = ref(0)
  const width = ref(0)
  const x = ref(0)
  const y = ref(0)

  function recalculate() {
    const el = unrefElement(target)

    if (!el) {
      if (reset) {
        height.value = 0
        bottom.value = 0
        left.value = 0
        right.value = 0
        top.value = 0
        width.value = 0
        x.value = 0
        y.value = 0
      }
      return
    }

    const rect = el.getBoundingClientRect()

    height.value = rect.height
    bottom.value = rect.bottom
    left.value = rect.left
    right.value = rect.right
    top.value = rect.top
    width.value = rect.width
    x.value = rect.x
    y.value = rect.y
  }

  function update() {
    if (updateTiming === 'sync')
      recalculate()
    else if (updateTiming === 'next-frame')
      requestAnimationFrame(() => recalculate())
  }

  useResizeObserver(target, update)
  watch(() => unrefElement(target), ele => !ele && update())
  // trigger by css or style
  useMutationObserver(target, update, {
    attributeFilter: ['style', 'class'],
  })

  if (windowScroll)
    useEventListener('scroll', update, { capture: true, passive: true })
  if (windowResize)
    useEventListener('resize', update, { passive: true })

  tryOnMounted(() => {
    if (immediate)
      update()
  })

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update,
  }
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>
