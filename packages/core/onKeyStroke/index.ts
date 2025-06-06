import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'

export type KeyPredicate = (event: KeyboardEvent) => boolean
export type KeyFilter = true | string | string[] | KeyPredicate
export type KeyStrokeEventName = 'keydown' | 'keypress' | 'keyup'

export interface OnKeyStrokeOptions {
  eventName?: KeyStrokeEventName
  target?: MaybeRefOrGetter<EventTarget | null | undefined>
  passive?: boolean
  /**
   * 当按键持续按下时，设置为`true`以忽略重复事件。
   *
   * @default false
   */
  dedupe?: MaybeRefOrGetter<boolean>
}

function createKeyPredicate(keyFilter: KeyFilter): KeyPredicate {
  if (typeof keyFilter === 'function')
    return keyFilter

  else if (typeof keyFilter === 'string')
    return (event: KeyboardEvent) => event.key === keyFilter

  else if (Array.isArray(keyFilter))
    return (event: KeyboardEvent) => keyFilter.includes(event.key)

  return () => true
}

/**
 * 监听键盘按键事件。
 *
 * @see https://vueuse.org/onKeyStroke
 */
export function onKeyStroke(key: KeyFilter, handler: (event: KeyboardEvent) => void, options?: OnKeyStrokeOptions): () => void
export function onKeyStroke(handler: (event: KeyboardEvent) => void, options?: OnKeyStrokeOptions): () => void
export function onKeyStroke(...args: any[]) {
  let key: KeyFilter
  let handler: (event: KeyboardEvent) => void
  let options: OnKeyStrokeOptions = {}

  if (args.length === 3) {
    key = args[0]
    handler = args[1]
    options = args[2]
  }
  else if (args.length === 2) {
    if (typeof args[1] === 'object') {
      key = true
      handler = args[0]
      options = args[1]
    }
    else {
      key = args[0]
      handler = args[1]
    }
  }
  else {
    key = true
    handler = args[0]
  }

  const {
    target = defaultWindow,
    eventName = 'keydown',
    passive = false,
    dedupe = false,
  } = options
  const predicate = createKeyPredicate(key)
  const listener = (e: KeyboardEvent) => {
    if (e.repeat && toValue(dedupe))
      return

    if (predicate(e))
      handler(e)
  }

  return useEventListener(target, eventName, listener, passive)
}

/**
 * 监听指定按键的 keydown 事件。
 *
 * @see https://vueuse.org/onKeyStroke
 * @param key
 * @param handler
 * @param options
 */
export function onKeyDown(key: KeyFilter, handler: (event: KeyboardEvent) => void, options: Omit<OnKeyStrokeOptions, 'eventName'> = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: 'keydown' })
}

/**
 * 监听指定按键的 keypress 事件。
 *
 * @see https://vueuse.org/onKeyStroke
 * @param key
 * @param handler
 * @param options
 */
export function onKeyPressed(key: KeyFilter, handler: (event: KeyboardEvent) => void, options: Omit<OnKeyStrokeOptions, 'eventName'> = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: 'keypress' })
}

/**
 * 监听指定按键的 keyup 事件。
 *
 * @see https://vueuse.org/onKeyStroke
 * @param key
 * @param handler
 * @param options
 */
export function onKeyUp(key: KeyFilter, handler: (event: KeyboardEvent) => void, options: Omit<OnKeyStrokeOptions, 'eventName'> = {}) {
  return onKeyStroke(key, handler, { ...options, eventName: 'keyup' })
}
