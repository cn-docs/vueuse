import type { Ref } from 'vue-demi'
import type { ConfigurableDocument } from '../_configurable'
import type { WindowEventName } from '../useEventListener'
import { ref } from 'vue-demi'
import { defaultDocument } from '../_configurable'
import { useEventListener } from '../useEventListener'

export type KeyModifier = 'Alt' | 'AltGraph' | 'CapsLock' | 'Control' | 'Fn' | 'FnLock' | 'Meta' | 'NumLock' | 'ScrollLock' | 'Shift' | 'Symbol' | 'SymbolLock'

const defaultEvents: WindowEventName[] = ['mousedown', 'mouseup', 'keydown', 'keyup']

export interface UseModifierOptions<Initial> extends ConfigurableDocument {
  /**
   * 触发修改器状态更新的事件名称
   *
   * @default ['mousedown', 'mouseup', 'keydown', 'keyup']
   */
  events?: WindowEventName[]

  /**
   * 返回的 ref 的初始值
   *
   * @default null
   */
  initial?: Initial
}

export type UseKeyModifierReturn<Initial> = Ref<Initial extends boolean ? boolean : boolean | null>

export function useKeyModifier<Initial extends boolean | null>(modifier: KeyModifier, options: UseModifierOptions<Initial> = {}): UseKeyModifierReturn<Initial> {
  const {
    events = defaultEvents,
    document = defaultDocument,
    initial = null,
  } = options

  const state = ref(initial) as Ref<boolean>

  if (document) {
    events.forEach((listenerEvent) => {
      useEventListener(document, listenerEvent, (evt: KeyboardEvent | MouseEvent) => {
        if (typeof evt.getModifierState === 'function')
          state.value = evt.getModifierState(modifier)
      })
    })
  }

  return state
}
