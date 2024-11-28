import type { ConfigurableEventFilter } from '@vueuse/shared'
import type { Ref } from 'vue'
import { createFilterWrapper, throttleFilter, timestamp } from '@vueuse/shared'
import { ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import type { WindowEventName } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'

const defaultEvents: WindowEventName[] = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
const oneMinute = 60_000

export interface UseIdleOptions extends ConfigurableWindow, ConfigurableEventFilter {
  /**
   * 用于监听检测到的用户活动的事件名称
   *
   * @default ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
   */
  events?: WindowEventName[]
  /**
   * 监听文档可见性变化
   *
   * @default true
   */
  listenForVisibilityChange?: boolean
  /**
   * ref idle 的初始状态
   *
   * @default false
   */
  initialState?: boolean
}

export interface UseIdleReturn {
  idle: Ref<boolean>
  lastActive: Ref<number>
  reset: () => void
}

/**
 * 跟踪用户是否处于非活动状态。
 *
 * @see https://vueuse.org/useIdle
 * @param timeout default to 1 minute
 * @param options IdleOptions
 */
export function useIdle(
  timeout: number = oneMinute,
  options: UseIdleOptions = {},
): UseIdleReturn {
  const {
    initialState = false,
    listenForVisibilityChange = true,
    events = defaultEvents,
    window = defaultWindow,
    eventFilter = throttleFilter(50),
  } = options
  const idle = ref(initialState)
  const lastActive = ref(timestamp())

  let timer: any

  const reset = () => {
    idle.value = false
    clearTimeout(timer)
    timer = setTimeout(() => idle.value = true, timeout)
  }

  const onEvent = createFilterWrapper(
    eventFilter,
    () => {
      lastActive.value = timestamp()
      reset()
    },
  )

  if (window) {
    const document = window.document
    for (const event of events)
      useEventListener(window, event, onEvent, { passive: true })

    if (listenForVisibilityChange) {
      useEventListener(document, 'visibilitychange', () => {
        if (!document.hidden)
          onEvent()
      })
    }

    reset()
  }

  return {
    idle,
    lastActive,
    reset,
  }
}
