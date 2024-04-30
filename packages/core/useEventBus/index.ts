import type { Fn } from '@vueuse/shared'
import { getCurrentScope } from 'vue-demi'
import { events } from './internal'

export type EventBusListener<T = unknown, P = any> = (event: T, payload?: P) => void
export type EventBusEvents<T, P = any> = Set<EventBusListener<T, P>>

// eslint-disable-next-line unused-imports/no-unused-vars
export interface EventBusKey<T> extends Symbol { }

export type EventBusIdentifier<T = unknown> = EventBusKey<T> | string | number

export interface UseEventBusReturn<T, P> {
  /**
   * 订阅事件。调用 emit 时，监听器将执行。
   * @param listener 监听器函数。
   * @returns 用于移除当前回调的停止函数。
   */
  on: (listener: EventBusListener<T, P>) => Fn
  /**
   * 类似于 `on`，但仅触发一次。
   * @param listener 监听器函数。
   * @returns 用于移除当前回调的停止函数。
   */
  once: (listener: EventBusListener<T, P>) => Fn
  /**
   * 发射事件，相应的事件监听器将执行。
   * @param event 发送的数据。
   * @param payload 附带的负载数据。
   */
  emit: (event?: T, payload?: P) => void
  /**
   * 移除相应的监听器。
   * @param listener 监听器函数。
   */
  off: (listener: EventBusListener<T>) => void
  /**
   * 清除所有事件。
   */
  reset: () => void
}

export function useEventBus<T = unknown, P = any>(key: EventBusIdentifier<T>): UseEventBusReturn<T, P> {
  const scope = getCurrentScope()
  function on(listener: EventBusListener<T, P>) {
    const listeners = (events.get(key) || new Set())
    listeners.add(listener)
    events.set(key, listeners)

    const _off = () => off(listener)
    // auto unsubscribe when scope get disposed
    // eslint-disable-next-line ts/prefer-ts-expect-error
    // @ts-ignore vue3 and vue2 mis-align
    scope?.cleanups?.push(_off)
    return _off
  }

  function once(listener: EventBusListener<T, P>) {
    function _listener(...args: any[]) {
      off(_listener)
      // @ts-expect-error cast
      listener(...args)
    }
    return on(_listener)
  }

  function off(listener: EventBusListener<T>): void {
    const listeners = events.get(key)
    if (!listeners)
      return

    listeners.delete(listener)

    if (!listeners.size)
      reset()
  }

  function reset() {
    events.delete(key)
  }

  function emit(event?: T, payload?: P) {
    events.get(key)?.forEach(v => v(event, payload))
  }

  return { on, once, off, emit, reset }
}
