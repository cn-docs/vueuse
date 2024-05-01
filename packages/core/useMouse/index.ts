import { ref } from 'vue-demi'
import type { ConfigurableEventFilter, MaybeRefOrGetter } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import type { Position } from '../types'

export type UseMouseCoordType = 'page' | 'client' | 'screen' | 'movement'
export type UseMouseSourceType = 'mouse' | 'touch' | null
export type UseMouseEventExtractor = (event: MouseEvent | Touch) => [x: number, y: number] | null | undefined

export interface UseMouseOptions extends ConfigurableWindow, ConfigurableEventFilter {
  /**
   * 基于页面、客户端、屏幕或相对于上一个位置的鼠标位置
   *
   * @default 'page'
   */
  type?: UseMouseCoordType | UseMouseEventExtractor

  /**
   * 在`target`元素上监听事件
   *
   * @default 'Window'
   */
  target?: MaybeRefOrGetter<Window | EventTarget | null | undefined>

  /**
   * 监听 `touchmove` 事件
   *
   * @default true
   */
  touch?: boolean

  /**
   * 在窗口上监听 `scroll` 事件，仅在 `type` 为 `page` 时有效
   *
   * @default true
   */
  scroll?: boolean

  /**
   * 当触发 `touchend` 事件时重置为初始值
   *
   * @default false
   */
  resetOnTouchEnds?: boolean

  /**
   * 初始值
   */
  initialValue?: Position
}

const UseMouseBuiltinExtractors: Record<UseMouseCoordType, UseMouseEventExtractor> = {
  page: event => [event.pageX, event.pageY],
  client: event => [event.clientX, event.clientY],
  screen: event => [event.screenX, event.screenY],
  movement: event => (event instanceof Touch
    ? null
    : [event.movementX, event.movementY]
  ),
} as const

/**
 * 响应式鼠标位置。
 *
 * @see https://vueuse.org/useMouse
 * @param options
 */
export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window = defaultWindow,
    target = window,
    scroll = true,
    eventFilter,
  } = options

  let _prevMouseEvent: MouseEvent | null = null

  const x = ref(initialValue.x)
  const y = ref(initialValue.y)
  const sourceType = ref<UseMouseSourceType>(null)

  const extractor = typeof type === 'function'
    ? type
    : UseMouseBuiltinExtractors[type]

  const mouseHandler = (event: MouseEvent) => {
    const result = extractor(event)
    _prevMouseEvent = event

    if (result) {
      [x.value, y.value] = result
      sourceType.value = 'mouse'
    }
  }

  const touchHandler = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0])
      if (result) {
        [x.value, y.value] = result
        sourceType.value = 'touch'
      }
    }
  }

  const scrollHandler = () => {
    if (!_prevMouseEvent || !window)
      return
    const pos = extractor(_prevMouseEvent)

    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window.scrollX
      y.value = pos[1] + window.scrollY
    }
  }

  const reset = () => {
    x.value = initialValue.x
    y.value = initialValue.y
  }

  const mouseHandlerWrapper = eventFilter
    ? (event: MouseEvent) => eventFilter(() => mouseHandler(event), {} as any)
    : (event: MouseEvent) => mouseHandler(event)

  const touchHandlerWrapper = eventFilter
    ? (event: TouchEvent) => eventFilter(() => touchHandler(event), {} as any)
    : (event: TouchEvent) => touchHandler(event)

  const scrollHandlerWrapper = eventFilter
    ? () => eventFilter(() => scrollHandler(), {} as any)
    : () => scrollHandler()

  if (target) {
    const listenerOptions = { passive: true }
    useEventListener(target, ['mousemove', 'dragover'], mouseHandlerWrapper, listenerOptions)
    if (touch && type !== 'movement') {
      useEventListener(target, ['touchstart', 'touchmove'], touchHandlerWrapper, listenerOptions)
      if (resetOnTouchEnds)
        useEventListener(target, 'touchend', reset, listenerOptions)
    }
    if (scroll && type === 'page')
      useEventListener(window, 'scroll', scrollHandlerWrapper, { passive: true })
  }

  return {
    x,
    y,
    sourceType,
  }
}

export type UseMouseReturn = ReturnType<typeof useMouse>
