import type { MaybeRefOrGetter } from '@vueuse/shared'
import { noop, toValue, tryOnMounted, useDebounceFn, useThrottleFn } from '@vueuse/shared'
import { computed, reactive, ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'

export interface UseScrollOptions extends ConfigurableWindow {
  /**
   * 滚动事件的节流时间，默认情况下禁用。
   *
   * @default 0
   */
  throttle?: number

  /**
   * 滚动结束时的检查时间。
   * 当配置了 `throttle` 时，该配置将设置为 (throttle + idle)。
   *
   * @default 200
   */
  idle?: number

  /**
   * 以 x 像素偏移到达状态
   *
   */
  offset?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }

  /**
   * 滚动时触发。
   *
   */
  onScroll?: (e: Event) => void

  /**
   * 滚动结束时触发。
   *
   */
  onStop?: (e: Event) => void

  /**
   * 滚动事件的监听器选项。
   *
   * @default {capture: false, passive: true}
   */
  eventListenerOptions?: boolean | AddEventListenerOptions

  /**
   * 可选地指定滚动行为为 `auto`（默认，非平滑滚动）或 `smooth`（用于平滑滚动），在更改 `x` 或 `y` 引用时生效。
   *
   * @default 'auto'
   */
  behavior?: MaybeRefOrGetter<ScrollBehavior>

  /**
   * 错误回调
   *
   * 默认将错误记录到 `console.error`
   */
  onError?: (error: unknown) => void
}

/**
 * 我们必须检查滚动量是否足够接近某个阈值，以便更准确地计算到达状态。
 * 这是因为 scrollTop/scrollLeft 是非四舍五入的数字，而 scrollHeight/scrollWidth 和 clientHeight/clientWidth 是四舍五入的。
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * 响应式滚动。
 *
 * @see https://vueuse.org/useScroll
 * @param element
 * @param options
 */

export function useScroll(
  element: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>,
  options: UseScrollOptions = {},
) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    eventListenerOptions = {
      capture: false,
      passive: true,
    },
    behavior = 'auto',
    window = defaultWindow,
    onError = (e) => { console.error(e) },
  } = options

  const internalX = ref(0)
  const internalY = ref(0)

  // Use a computed for x and y because we want to write the value to the refs
  // during a `scrollTo()` without firing additional `scrollTo()`s in the process.
  const x = computed({
    get() {
      return internalX.value
    },
    set(x) {
      scrollTo(x, undefined)
    },
  })

  const y = computed({
    get() {
      return internalY.value
    },
    set(y) {
      scrollTo(undefined, y)
    },
  })

  function scrollTo(_x: number | undefined, _y: number | undefined) {
    if (!window)
      return

    const _element = toValue(element)
    if (!_element)
      return

    (_element instanceof Document ? window.document.body : _element)?.scrollTo({
      top: toValue(_y) ?? y.value,
      left: toValue(_x) ?? x.value,
      behavior: toValue(behavior),
    })
    const scrollContainer
      = (_element as Window)?.document?.documentElement
      || (_element as Document)?.documentElement
      || (_element as Element)
    if (x != null)
      internalX.value = scrollContainer.scrollLeft
    if (y != null)
      internalY.value = scrollContainer.scrollTop
  }

  const isScrolling = ref(false)
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false,
  })
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  const onScrollEnd = (e: Event) => {
    // dedupe if support native scrollend event
    if (!isScrolling.value)
      return

    isScrolling.value = false
    directions.left = false
    directions.right = false
    directions.top = false
    directions.bottom = false
    onStop(e)
  }
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle)

  const setArrivedState = (target: HTMLElement | SVGElement | Window | Document | null | undefined) => {
    if (!window)
      return

    const el: Element = (
      (target as Window)?.document?.documentElement
      || (target as Document)?.documentElement
      || unrefElement(target as HTMLElement | SVGElement)
    ) as Element

    const { display, flexDirection } = getComputedStyle(el)

    const scrollLeft = el.scrollLeft
    directions.left = scrollLeft < internalX.value
    directions.right = scrollLeft > internalX.value

    const left = Math.abs(scrollLeft) <= (offset.left || 0)
    const right = Math.abs(scrollLeft)
      + el.clientWidth >= el.scrollWidth
      - (offset.right || 0)
      - ARRIVED_STATE_THRESHOLD_PIXELS

    if (display === 'flex' && flexDirection === 'row-reverse') {
      arrivedState.left = right
      arrivedState.right = left
    }
    else {
      arrivedState.left = left
      arrivedState.right = right
    }

    internalX.value = scrollLeft

    let scrollTop = el.scrollTop

    // patch for mobile compatible
    if (target === window.document && !scrollTop)
      scrollTop = window.document.body.scrollTop

    directions.top = scrollTop < internalY.value
    directions.bottom = scrollTop > internalY.value
    const top = Math.abs(scrollTop) <= (offset.top || 0)
    const bottom = Math.abs(scrollTop)
      + el.clientHeight >= el.scrollHeight
      - (offset.bottom || 0)
      - ARRIVED_STATE_THRESHOLD_PIXELS

    /**
     * reverse columns and rows behave exactly the other way around,
     * bottom is treated as top and top is treated as the negative version of bottom
     */
    if (display === 'flex' && flexDirection === 'column-reverse') {
      arrivedState.top = bottom
      arrivedState.bottom = top
    }
    else {
      arrivedState.top = top
      arrivedState.bottom = bottom
    }

    internalY.value = scrollTop
  }

  const onScrollHandler = (e: Event) => {
    if (!window)
      return

    const eventTarget = (
      (e.target as Document).documentElement ?? e.target
    ) as HTMLElement

    setArrivedState(eventTarget)

    isScrolling.value = true
    onScrollEndDebounced(e)
    onScroll(e)
  }

  useEventListener(
    element,
    'scroll',
    throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler,
    eventListenerOptions,
  )

  tryOnMounted(() => {
    try {
      const _element = toValue(element)
      if (!_element)
        return
      setArrivedState(_element)
    }
    catch (e) {
      onError(e)
    }
  })

  useEventListener(
    element,
    'scrollend',
    onScrollEnd,
    eventListenerOptions,
  )

  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element)

      if (window && _element)
        setArrivedState(_element)
    },
  }
}

export type UseScrollReturn = ReturnType<typeof useScroll>
