import type { MaybeRef, MaybeRefOrGetter, ReadonlyRefOrGetter } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue'
import { toRef, toValue, tryOnBeforeUnmount } from '@vueuse/shared'
import { watch } from 'vue'
import type { ConfigurableDocument } from '../_configurable'
import { defaultDocument } from '../_configurable'
import { useMutationObserver } from '../useMutationObserver'

export type UseTitleOptionsBase = {
  /**
   * 在组件卸载时恢复原始标题
   * @param originTitle 原始标题
   * @returns 恢复的标题
   */
  restoreOnUnmount?: false | ((originalTitle: string, currentTitle: string) => string | null | undefined)
} & (
  {
    /**
     * 使用 MutationObserve 观察 `document.title` 的变化
     * 不能与 `titleTemplate` 选项一起使用。
     *
     * @default false
     */
    observe?: boolean
  }
  | {
  /**
   * 用于解析标题的模板字符串（例如，'%s | My Website'）
   * 不能与 `observe` 选项一起使用。
   *
   * @default '%s'
   */
    titleTemplate?: MaybeRef<string> | ((title: string) => string)
  }
  )

export type UseTitleOptions = ConfigurableDocument & UseTitleOptionsBase

export function useTitle(
  newTitle: ReadonlyRefOrGetter<string | null | undefined>,
  options?: UseTitleOptions,
): ComputedRef<string | null | undefined>

export function useTitle(
  newTitle?: MaybeRef<string | null | undefined>,
  options?: UseTitleOptions,
): Ref<string | null | undefined>

/**
 * 响应式 document title.
 *
 * @see https://vueuse.org/useTitle
 * @param newTitle
 * @param options
 */
export function useTitle(
  newTitle: MaybeRefOrGetter<string | null | undefined> = null,
  options: UseTitleOptions = {},
) {
  /*
    `titleTemplate` that returns the modified input string will make
    the `document.title` to be different from the `title.value`,
    causing the title to update infinitely if `observe` is set to `true`.
  */
  const {
    document = defaultDocument,
    restoreOnUnmount = t => t,
  } = options
  const originalTitle = document?.title ?? ''

  const title: Ref<string | null | undefined> = toRef(newTitle ?? document?.title ?? null)
  const isReadonly = newTitle && typeof newTitle === 'function'

  function format(t: string) {
    if (!('titleTemplate' in options))
      return t
    const template = options.titleTemplate || '%s'
    return typeof template === 'function'
      ? template(t)
      : toValue(template).replace(/%s/g, t)
  }

  watch(
    title,
    (t, o) => {
      if (t !== o && document)
        document.title = format(typeof t === 'string' ? t : '')
    },
    { immediate: true },
  )

  if ((options as any).observe && !(options as any).titleTemplate && document && !isReadonly) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== title.value)
          title.value = format(document.title)
      },
      { childList: true },
    )
  }

  tryOnBeforeUnmount(() => {
    if (restoreOnUnmount) {
      const restoredTitle = restoreOnUnmount(originalTitle, title.value || '')
      if (restoredTitle != null && document)
        document.title = restoredTitle
    }
  })

  return title
}

export type UseTitleReturn = ReturnType<typeof useTitle>
