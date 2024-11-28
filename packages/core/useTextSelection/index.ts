import { computed, ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'

function getRangesFromSelection(selection: Selection) {
  const rangeCount = selection.rangeCount ?? 0
  return Array.from({ length: rangeCount }, (_, i) => selection.getRangeAt(i))
}

/**
 * 基于 [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection) 响应式跟踪用户文本选择。
 *
 * @see https://vueuse.org/useTextSelection
 */
export function useTextSelection(options: ConfigurableWindow = {}) {
  const {
    window = defaultWindow,
  } = options

  const selection = ref<Selection | null>(null)
  const text = computed(() => selection.value?.toString() ?? '')
  const ranges = computed<Range[]>(() => selection.value ? getRangesFromSelection(selection.value) : [])
  const rects = computed(() => ranges.value.map(range => range.getBoundingClientRect()))

  function onSelectionChange() {
    selection.value = null // trigger computed update
    if (window)
      selection.value = window.getSelection()
  }

  if (window)
    useEventListener(window.document, 'selectionchange', onSelectionChange)

  return {
    text,
    rects,
    ranges,
    selection,
  }
}

export type UseTextSelectionReturn = ReturnType<typeof useTextSelection>
