import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue-demi'
import type { ConfigurableNavigator } from '../_configurable'
import { toValue, useTimeoutFn } from '@vueuse/shared'
import { ref } from 'vue-demi'
import { defaultNavigator } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'

export interface UseClipboardItemsOptions<Source> extends ConfigurableNavigator {
  /**
   * 启用剪贴板读取
   *
   * @default false
   */
  read?: boolean

  /**
   * 复制的数据源
   */
  source?: Source

  /**
   * 重置 `copied` ref 状态的毫秒数
   *
   * @default 1500
   */
  copiedDuring?: number
}

export interface UseClipboardItemsReturn<Optional> {
  isSupported: Ref<boolean>
  content: ComputedRef<ClipboardItems>
  copied: ComputedRef<boolean>
  copy: Optional extends true ? (content?: ClipboardItems) => Promise<void> : (text: ClipboardItems) => Promise<void>
}

/**
 * 响应式 Clipboard API.
 *
 * @see https://vueuse.org/useClipboardItems
 * @param options
 */
export function useClipboardItems(options?: UseClipboardItemsOptions<undefined>): UseClipboardItemsReturn<false>
export function useClipboardItems(options: UseClipboardItemsOptions<MaybeRefOrGetter<ClipboardItems>>): UseClipboardItemsReturn<true>
export function useClipboardItems(options: UseClipboardItemsOptions<MaybeRefOrGetter<ClipboardItems> | undefined> = {}): UseClipboardItemsReturn<boolean> {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
  } = options

  const isSupported = useSupported(() => (navigator && 'clipboard' in navigator))
  const content = ref<ClipboardItems>([])
  const copied = ref(false)
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring)

  function updateContent() {
    if (isSupported.value) {
      navigator!.clipboard.read().then((items) => {
        content.value = items
      })
    }
  }

  if (isSupported.value && read)
    useEventListener(['copy', 'cut'], updateContent)

  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      await navigator!.clipboard.write(value)

      content.value = value
      copied.value = true
      timeout.start()
    }
  }

  return {
    isSupported,
    content: content as ComputedRef<ClipboardItems>,
    copied: copied as ComputedRef<boolean>,
    copy,
  }
}
