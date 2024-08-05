import type { Arrayable, Fn, MaybeRefOrGetter } from '@vueuse/shared'
import { isObject, noop, toValue, tryOnScopeDispose } from '@vueuse/shared'
import { watch } from 'vue-demi'
import type { MaybeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import { defaultWindow } from '../_configurable'

interface InferEventTarget<Events> {
  addEventListener: (event: Events, fn?: any, options?: any) => any
  removeEventListener: (event: Events, fn?: any, options?: any) => any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 1：监听 window 事件
 *
 * @see https://vueuse.org/useEventListener
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器或事件监听器数组。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 2：显式指定了 Window 目标
 *
 * @see https://vueuse.org/useEventListener
 * @param target Window 目标对象。
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器或事件监听器数组。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 3：显式指定了 Document 目标
 *
 * @see https://vueuse.org/useEventListener
 * @param target Document 或 ShadowRoot 目标对象。
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器或事件监听器数组。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: DocumentOrShadowRoot,
  event: Arrayable<E>,
  listener: Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 4：显式指定了 HTMLElement 目标
 *
 * @see https://vueuse.org/useEventListener
 * @param target HTMLElement 目标对象。
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  event: Arrayable<E>,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): () => void

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 5：自定义事件目标，并推断事件类型
 *
 * @see https://vueuse.org/useEventListener
 * @param target 自定义事件目标对象，根据事件名推断。
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器或事件监听器数组。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: MaybeRefOrGetter<InferEventTarget<Names> | null | undefined>,
  event: Arrayable<Names>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * 在挂载时使用 addEventListener 进行注册，并在卸载时自动使用 removeEventListener 进行移除。
 *
 * 重载 6：自定义事件目标，通用型
 *
 * @see https://vueuse.org/useEventListener
 * @param target 自定义事件目标对象。
 * @param event 事件类型或事件类型数组。
 * @param listener 事件监听器或事件监听器数组。
 * @param options 可选项，用于配置事件监听的行为。
 */
export function useEventListener<EventType = Event>(
  target: MaybeRefOrGetter<EventTarget | null | undefined>,
  event: Arrayable<string>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeRefOrGetter<EventTarget> | undefined
  let events: Arrayable<string>
  let listeners: Arrayable<Function>
  let options: MaybeRefOrGetter<boolean | AddEventListenerOptions> | undefined

  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    [events, listeners, options] = args
    target = defaultWindow
  }
  else {
    [target, events, listeners, options] = args
  }

  if (!target)
    return noop

  if (!Array.isArray(events))
    events = [events]
  if (!Array.isArray(listeners))
    listeners = [listeners]

  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const register = (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => [unrefElement(target as unknown as MaybeElementRef), toValue(options)],
    ([el, options]) => {
      cleanup()
      if (!el)
        return

      // create a clone of options, to avoid it being changed reactively on removal
      const optionsClone = isObject(options) ? { ...options } : options
      cleanups.push(
        ...(events as string[]).flatMap((event) => {
          return (listeners as Function[]).map(listener => register(el, event, listener, optionsClone))
        }),
      )
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}
