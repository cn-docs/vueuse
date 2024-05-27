import type { MaybeRef } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import type { WatchSource } from 'vue-demi'
import { nextTick, ref, watch } from 'vue-demi'
import { useResizeObserver } from '../useResizeObserver'

export interface UseTextareaAutosizeOptions {
  /** 自动调整大小的文本区域元素。 */
  element?: MaybeRef<HTMLTextAreaElement | undefined>
  /** 文本区域的内容。 */
  input?: MaybeRef<string | undefined>
  /** 监听应触发文本区域大小调整的源。 */
  watch?: WatchSource | Array<WatchSource>
  /** 当文本区域大小发生变化时调用的函数。 */
  onResize?: () => void
  /** 指定样式目标以根据文本区域内容应用高度。如果未提供，将使用文本区域本身。 */
  styleTarget?: MaybeRef<HTMLElement>
  /** 指定用于调整高度的样式属性。可以是 `height | minHeight`。默认值为 `height`。 */
  styleProp?: 'height' | 'minHeight'
}

export function useTextareaAutosize(options?: UseTextareaAutosizeOptions) {
  const textarea = ref<HTMLTextAreaElement>(options?.element as any)
  const input = ref<string>(options?.input as any)
  const styleProp = options?.styleProp ?? 'height'
  const textareaScrollHeight = ref(1)

  function triggerResize() {
    if (!textarea.value)
      return

    let height = ''

    textarea.value.style[styleProp] = '1px'
    textareaScrollHeight.value = textarea.value?.scrollHeight

    // If style target is provided update its height
    if (options?.styleTarget)
      toValue(options.styleTarget).style[styleProp] = `${textareaScrollHeight.value}px`
    // else update textarea's height by updating height variable
    else
      height = `${textareaScrollHeight.value}px`

    textarea.value.style[styleProp] = height
  }

  watch([input, textarea], () => nextTick(triggerResize), { immediate: true })

  watch(textareaScrollHeight, () => options?.onResize?.())

  useResizeObserver(textarea, () => triggerResize())

  if (options?.watch)
    watch(options.watch, triggerResize, { immediate: true, deep: true })

  return {
    textarea,
    input,
    triggerResize,
  }
}

export type UseTextareaAutosizeReturn = ReturnType<typeof useTextareaAutosize>
