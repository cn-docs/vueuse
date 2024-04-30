import type { ComputedRef } from 'vue-demi'
import { computed, reactive, ref } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { noop, toValue } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'
import { defaultWindow } from '../_configurable'
import { DefaultMagicKeysAliasMap } from './aliasMap'

export interface UseMagicKeysOptions<Reactive extends boolean> {
  /**
   * 返回一个响应式对象而不是 ref 对象
   *
   * @default false
   */
  reactive?: Reactive

  /**
   * 监听事件的目标
   *
   * @default window
   */
  target?: MaybeRefOrGetter<EventTarget>

  /**
   * 键的别名映射，所有键都应为小写
   * { target: keycode }
   *
   * @example { ctrl: "control" }
   * @default <预定义映射>
   */
  aliasMap?: Record<string, string>

  /**
   * 注册被动监听器
   *
   * @default true
   */
  passive?: boolean

  /**
   * 自定义键盘按下/释放事件的处理程序。
   * 当您想应用自定义逻辑时很有用。
   *
   * 当使用 `e.preventDefault()` 时，您需要传递 `passive: false` 给 `useMagicKeys()`。
   */
  onEventFired?: (e: KeyboardEvent) => void | boolean
}

export interface MagicKeysInternal {
  /**
   * 当前按下的键的集合，
   * 存储原始的键码。
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
   */
  current: Set<string>
}

export type UseMagicKeysReturn<Reactive extends boolean> =
  Readonly<
    Omit<Reactive extends true
      ? Record<string, boolean>
      : Record<string, ComputedRef<boolean>>, keyof MagicKeysInternal>
      & MagicKeysInternal
  >

/**
 * 响应式按键按下状态，具有神奇按键组合支持。
 *
 * @see https://vueuse.org/useMagicKeys
 */
export function useMagicKeys(options?: UseMagicKeysOptions<false>): UseMagicKeysReturn<false>
export function useMagicKeys(options: UseMagicKeysOptions<true>): UseMagicKeysReturn<true>
export function useMagicKeys(options: UseMagicKeysOptions<boolean> = {}): any {
  const {
    reactive: useReactive = false,
    target = defaultWindow,
    aliasMap = DefaultMagicKeysAliasMap,
    passive = true,
    onEventFired = noop,
  } = options
  const current = reactive(new Set<string>())
  const obj = {
    toJSON() { return {} },
    current,
  }
  const refs: Record<string, any> = useReactive ? reactive(obj) : obj
  const metaDeps = new Set<string>()
  const usedKeys = new Set<string>()

  function setRefs(key: string, value: boolean) {
    if (key in refs) {
      if (useReactive)
        refs[key] = value
      else
        refs[key].value = value
    }
  }

  function reset() {
    current.clear()
    for (const key of usedKeys)
      setRefs(key, false)
  }

  function updateRefs(e: KeyboardEvent, value: boolean) {
    const key = e.key?.toLowerCase()
    const code = e.code?.toLowerCase()
    const values = [code, key].filter(Boolean)

    // current set
    if (key) {
      if (value)
        current.add(key)
      else
        current.delete(key)
    }

    for (const key of values) {
      usedKeys.add(key)
      setRefs(key, value)
    }

    // #1312
    // In macOS, keys won't trigger "keyup" event when Meta key is released
    // We track it's combination and release manually
    if (key === 'meta' && !value) {
      // Meta key released
      metaDeps.forEach((key) => {
        current.delete(key)
        setRefs(key, false)
      })
      metaDeps.clear()
    }
    else if (typeof e.getModifierState === 'function' && e.getModifierState('Meta') && value) {
      [...current, ...values].forEach(key => metaDeps.add(key))
    }
  }

  useEventListener(target, 'keydown', (e: KeyboardEvent) => {
    updateRefs(e, true)
    return onEventFired(e)
  }, { passive })
  useEventListener(target, 'keyup', (e: KeyboardEvent) => {
    updateRefs(e, false)
    return onEventFired(e)
  }, { passive })

  // #1350
  useEventListener('blur', reset, { passive: true })
  useEventListener('focus', reset, { passive: true })

  const proxy = new Proxy(
    refs,
    {
      get(target, prop, rec) {
        if (typeof prop !== 'string')
          return Reflect.get(target, prop, rec)

        prop = prop.toLowerCase()
        // alias
        if (prop in aliasMap)
          prop = aliasMap[prop]
        // create new tracking
        if (!(prop in refs)) {
          if (/[+_-]/.test(prop)) {
            const keys = prop.split(/[+_-]/g).map(i => i.trim())
            refs[prop] = computed(() => keys.every(key => toValue(proxy[key])))
          }
          else {
            refs[prop] = ref(false)
          }
        }
        const r = Reflect.get(target, prop, rec)
        return useReactive ? toValue(r) : r
      },
    },
  )

  return proxy as any
}

export { DefaultMagicKeysAliasMap } from './aliasMap'
