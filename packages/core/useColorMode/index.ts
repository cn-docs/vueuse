import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue'
import { toRef, tryOnMounted } from '@vueuse/shared'
import { computed, watch } from 'vue'
import type { StorageLike } from '../ssr-handlers'
import type { MaybeElementRef } from '../unrefElement'
import type { UseStorageOptions } from '../useStorage'
import { defaultWindow } from '../_configurable'
import { getSSRHandler } from '../ssr-handlers'
import { unrefElement } from '../unrefElement'
import { usePreferredDark } from '../usePreferredDark'
import { useStorage } from '../useStorage'

export type BasicColorMode = 'light' | 'dark'
export type BasicColorSchema = BasicColorMode | 'auto'

export interface UseColorModeOptions<T extends string = BasicColorMode> extends UseStorageOptions<T | BasicColorMode> {
  /**
   * 应用目标元素的 CSS 选择器
   *
   * @default 'html'
   */
  selector?: string | MaybeElementRef

  /**
   * 应用于目标元素的 HTML 属性
   *
   * @default 'class'
   */
  attribute?: string

  /**
   * 初始颜色模式
   *
   * @default 'auto'
   */
  initialValue?: MaybeRefOrGetter<T | BasicColorSchema>

  /**
   * 添加到属性时的前缀
   */
  modes?: Partial<Record<T | BasicColorSchema, string>>

  /**
   * 用于处理更新的自定义处理程序。
   * 当指定时，将覆盖默认行为。
   *
   * @default undefined
   */
  onChanged?: (mode: T | BasicColorMode, defaultHandler:((mode: T | BasicColorMode) => void)) => void

  /**
   * 自定义存储 ref
   *
   * 如果提供了，将跳过 `useStorage`
   */
  storageRef?: Ref<T | BasicColorSchema>

  /**
   * 将数据持久化到 localStorage/sessionStorage 的键。
   *
   * 将 `null` 传递以禁用持久性
   *
   * @default 'vueuse-color-scheme'
   */
  storageKey?: string | null

  /**
   * 存储对象，可以是 localStorage 或 sessionStorage
   *
   * @default localStorage
   */
  storage?: StorageLike

  /**
   * 从状态中发出 `auto` 模式
   *
   * 当设置为 `true` 时，首选模式不会被转换为 `light` 或 `dark`。
   * 当需要知道选择了 `auto` 模式时，这很有用。
   *
   * @default undefined
   * @deprecated 当需要知道选择了 `auto` 模式时，使用 `store.value`
   * @see https://vueuse.org/core/useColorMode/#advanced-usage
   */
  emitAuto?: boolean

  /**
   * 关闭切换时的过渡效果
   *
   * @see https://paco.me/writing/disable-theme-transitions
   * @default true
   */
  disableTransition?: boolean
}

export type UseColorModeReturn<T extends string = BasicColorMode> =
  Ref<T | BasicColorSchema> & {
    store: Ref<T | BasicColorSchema>
    system: ComputedRef<BasicColorMode>
    state: ComputedRef<T | BasicColorMode>
  }

const CSS_DISABLE_TRANS = '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'

/**
 * Reactive color mode with auto data persistence.
 *
 * @see https://vueuse.org/useColorMode
 * @param options
 */
export function useColorMode<T extends string = BasicColorMode>(
  options: UseColorModeOptions<T> = {},
): UseColorModeReturn<T> {
  const {
    selector = 'html',
    attribute = 'class',
    initialValue = 'auto',
    window = defaultWindow,
    storage,
    storageKey = 'vueuse-color-scheme',
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true,
  } = options

  const modes = {
    auto: '',
    light: 'light',
    dark: 'dark',
    ...options.modes || {},
  } as Record<BasicColorSchema | T, string>

  const preferredDark = usePreferredDark({ window })
  const system = computed(() => preferredDark.value ? 'dark' : 'light')

  const store = storageRef || (
    storageKey == null
      ? toRef(initialValue) as Ref<T | BasicColorSchema>
      : useStorage<T | BasicColorSchema>(storageKey, initialValue, storage, { window, listenToStorageChanges })
  )

  const state = computed<T | BasicColorMode>(() =>
    store.value === 'auto'
      ? system.value
      : store.value)

  const updateHTMLAttrs = getSSRHandler(
    'updateHTMLAttrs',
    (selector, attribute, value) => {
      const el = typeof selector === 'string'
        ? window?.document.querySelector(selector)
        : unrefElement(selector)
      if (!el)
        return

      const classesToAdd = new Set<string>()
      const classesToRemove = new Set<string>()
      let attributeToChange: { key: string, value: string } | null = null

      if (attribute === 'class') {
        const current = value.split(/\s/g)
        Object.values(modes)
          .flatMap(i => (i || '').split(/\s/g))
          .filter(Boolean)
          .forEach((v) => {
            if (current.includes(v))
              classesToAdd.add(v)
            else
              classesToRemove.add(v)
          })
      }
      else {
        attributeToChange = { key: attribute, value }
      }

      if (classesToAdd.size === 0 && classesToRemove.size === 0 && attributeToChange === null)
        // Nothing changed so we can avoid reflowing the page
        return

      let style: HTMLStyleElement | undefined
      if (disableTransition) {
        style = window!.document.createElement('style')
        style.appendChild(document.createTextNode(CSS_DISABLE_TRANS))
        window!.document.head.appendChild(style)
      }

      for (const c of classesToAdd) {
        el.classList.add(c)
      }
      for (const c of classesToRemove) {
        el.classList.remove(c)
      }
      if (attributeToChange) {
        el.setAttribute(attributeToChange.key, attributeToChange.value)
      }

      if (disableTransition) {
        // Calling getComputedStyle forces the browser to redraw
        // @ts-expect-error unused variable
        const _ = window!.getComputedStyle(style!).opacity
        document.head.removeChild(style!)
      }
    },
  )

  function defaultOnChanged(mode: T | BasicColorMode) {
    updateHTMLAttrs(selector, attribute, modes[mode] ?? mode)
  }

  function onChanged(mode: T | BasicColorMode) {
    if (options.onChanged)
      options.onChanged(mode, defaultOnChanged)
    else
      defaultOnChanged(mode)
  }

  watch(state, onChanged, { flush: 'post', immediate: true })

  tryOnMounted(() => onChanged(state.value))

  const auto = computed({
    get() {
      return emitAuto ? store.value : state.value
    },
    set(v) {
      store.value = v
    },
  })

  return Object.assign(auto, { store, system, state }) as UseColorModeReturn<T>
}
