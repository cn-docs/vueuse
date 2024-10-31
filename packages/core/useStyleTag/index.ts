import type { MaybeRef } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import type { ConfigurableDocument } from '../_configurable'
import { tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'
import { readonly, ref, watch } from 'vue-demi'
import { defaultDocument } from '../_configurable'

export interface UseStyleTagOptions extends ConfigurableDocument {
  /**
   * 要应用的样式的媒体查询
   */
  media?: string

  /**
   * 立即加载样式
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 手动控制加载和卸载的时机
   *
   * @default false
   */
  manual?: boolean

  /**
   * 样式标签的 DOM id
   *
   * @default 自动递增
   */
  id?: string
}

export interface UseStyleTagReturn {
  id: string
  css: Ref<string>
  load: () => void
  unload: () => void
  isLoaded: Readonly<Ref<boolean>>
}

let _id = 0

/**
 * 在头部注入 <style> 元素。
 *
 * 重载：省略了 id
 *
 * @see https://vueuse.org/useStyleTag
 * @param css
 * @param options
 */
export function useStyleTag(
  css: MaybeRef<string>,
  options: UseStyleTagOptions = {},
): UseStyleTagReturn {
  const isLoaded = ref(false)

  const {
    document = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`,
  } = options

  const cssRef = ref(css)

  let stop = () => { }
  const load = () => {
    if (!document)
      return

    const el = (document.getElementById(id) || document.createElement('style')) as HTMLStyleElement

    if (!el.isConnected) {
      el.id = id
      if (options.media)
        el.media = options.media
      document.head.appendChild(el)
    }

    if (isLoaded.value)
      return

    stop = watch(
      cssRef,
      (value) => {
        el.textContent = value
      },
      { immediate: true },
    )

    isLoaded.value = true
  }

  const unload = () => {
    if (!document || !isLoaded.value)
      return
    stop()
    document.head.removeChild(document.getElementById(id) as HTMLStyleElement)
    isLoaded.value = false
  }

  if (immediate && !manual)
    tryOnMounted(load)

  if (!manual)
    tryOnScopeDispose(unload)

  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded),
  }
}
