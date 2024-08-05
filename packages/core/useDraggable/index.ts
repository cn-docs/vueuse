import { computed, ref } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { isClient, toRefs, toValue } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'
import type { PointerType, Position } from '../types'
import { defaultWindow } from '../_configurable'

export interface UseDraggableOptions {
  /**
   * 只有在直接点击元素时才开始拖动
   *
   * @default false
   */
  exact?: MaybeRefOrGetter<boolean>

  /**
   * 阻止事件的默认行为
   *
   * @default false
   */
  preventDefault?: MaybeRefOrGetter<boolean>

  /**
   * 阻止事件的传播
   *
   * @default false
   */
  stopPropagation?: MaybeRefOrGetter<boolean>

  /**
   * 是否在捕获阶段分发事件
   *
   * @default true
   */
  capture?: boolean

  /**
   * 要附加 `pointermove` 和 `pointerup` 事件的元素。
   *
   * @default window
   */
  draggingElement?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>

  /**
   * 用于计算边界的元素（如果未设置，将使用事件的目标）。
   *
   * @default undefined
   */
  containerElement?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

  /**
   * 触发拖动事件的句柄
   *
   * @default target
   */
  handle?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

  /**
   * 监听的指针类型。
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]

  /**
   * 元素的初始位置。
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: MaybeRefOrGetter<Position>

  /**
   * 拖动开始时的回调函数。返回 `false` 可以防止拖动。
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * 拖动过程中的回调函数。
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * 拖动结束时的回调函数。
   */
  onEnd?: (position: Position, event: PointerEvent) => void

  /**
   * 要在其上拖动的轴。
   *
   * @default 'both'
   */
  axis?: 'x' | 'y' | 'both'

  /**
   * 禁用拖放。
   *
   * @default false
   */
  disabled?: MaybeRefOrGetter<boolean>

  /**
   * Mouse buttons that are allowed to trigger drag events.
   *
   * - `0`: Main button, usually the left button or the un-initialized state
   * - `1`: Auxiliary button, usually the wheel button or the middle button (if present)
   * - `2`: Secondary button, usually the right button
   * - `3`: Fourth button, typically the Browser Back button
   * - `4`: Fifth button, typically the Browser Forward button
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
   * @default [0]
   */
  buttons?: MaybeRefOrGetter<number[]>
}

/**
 * 使元素可拖动。
 *
 * @see https://vueuse.org/useDraggable
 * @param target
 * @param options
 */
export function useDraggable(
  target: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>,
  options: UseDraggableOptions = {},
) {
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = 'both',
    draggingElement = defaultWindow,
    containerElement,
    handle: draggingHandle = target,
    buttons = [0],
  } = options

  const position = ref<Position>(
    toValue(initialValue) ?? { x: 0, y: 0 },
  )

  const pressedDelta = ref<Position>()

  const filterEvent = (e: PointerEvent) => {
    if (pointerTypes)
      return pointerTypes.includes(e.pointerType as PointerType)
    return true
  }

  const handleEvent = (e: PointerEvent) => {
    if (toValue(preventDefault))
      e.preventDefault()
    if (toValue(stopPropagation))
      e.stopPropagation()
  }

  const start = (e: PointerEvent) => {
    if (!toValue(buttons).includes(e.button))
      return
    if (toValue(options.disabled) || !filterEvent(e))
      return
    if (toValue(exact) && e.target !== toValue(target))
      return

    const container = toValue(containerElement)
    const containerRect = container?.getBoundingClientRect?.()
    const targetRect = toValue(target)!.getBoundingClientRect()
    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect!.left + container.scrollLeft : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect!.top + container.scrollTop : targetRect.top),
    }
    if (onStart?.(pos, e) === false)
      return
    pressedDelta.value = pos
    handleEvent(e)
  }
  const move = (e: PointerEvent) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return
    if (!pressedDelta.value)
      return

    const container = toValue(containerElement)
    const targetRect = toValue(target)!.getBoundingClientRect()
    let { x, y } = position.value
    if (axis === 'x' || axis === 'both') {
      x = e.clientX - pressedDelta.value.x
      if (container)
        x = Math.min(Math.max(0, x), container.scrollWidth - targetRect!.width)
    }
    if (axis === 'y' || axis === 'both') {
      y = e.clientY - pressedDelta.value.y
      if (container)
        y = Math.min(Math.max(0, y), container.scrollHeight - targetRect!.height)
    }
    position.value = {
      x,
      y,
    }
    onMove?.(position.value, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (toValue(options.disabled) || !filterEvent(e))
      return
    if (!pressedDelta.value)
      return
    pressedDelta.value = undefined
    onEnd?.(position.value, e)
    handleEvent(e)
  }

  if (isClient) {
    const config = { capture: options.capture ?? true }
    useEventListener(draggingHandle, 'pointerdown', start, config)
    useEventListener(draggingElement, 'pointermove', move, config)
    useEventListener(draggingElement, 'pointerup', end, config)
  }

  return {
    ...toRefs(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(
      () => `left:${position.value.x}px;top:${position.value.y}px;`,
    ),
  }
}

export type UseDraggableReturn = ReturnType<typeof useDraggable>
