import type { Ref } from 'vue-demi'

// eslint-disable-next-line no-restricted-imports
import { ref, shallowRef, unref } from 'vue-demi'
import type { MaybeRef, MaybeRefOrGetter } from '@vueuse/shared'
import { isClient, notNullish } from '@vueuse/shared'

import { useEventListener } from '../useEventListener'

export interface UseDropZoneReturn {
  files: Ref<File[] | null>
  isOverDropZone: Ref<boolean>
}

export interface UseDropZoneOptions {
  /**
   * 允许的数据类型，如果未设置，则允许所有数据类型。
   * 也可以是检查数据类型的函数。
   */
  dataTypes?: MaybeRef<string[]> | ((types: readonly string[]) => boolean)
  onDrop?: (files: File[] | null, event: DragEvent) => void
  onEnter?: (files: File[] | null, event: DragEvent) => void
  onLeave?: (files: File[] | null, event: DragEvent) => void
  onOver?: (files: File[] | null, event: DragEvent) => void
}

export function useDropZone(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options: UseDropZoneOptions | UseDropZoneOptions['onDrop'] = {},
): UseDropZoneReturn {
  const isOverDropZone = ref(false)
  const files = shallowRef<File[] | null>(null)
  let counter = 0
  let isDataTypeIncluded = true
  if (isClient) {
    const _options = typeof options === 'function' ? { onDrop: options } : options
    const getFiles = (event: DragEvent) => {
      const list = Array.from(event.dataTransfer?.files ?? [])
      return (files.value = list.length === 0 ? null : list)
    }

    useEventListener<DragEvent>(target, 'dragenter', (event) => {
      const types = Array.from(event?.dataTransfer?.items || [])
        .map(i => i.kind === 'file' ? i.type : null)
        .filter(notNullish)

      if (_options.dataTypes && event.dataTransfer) {
        const dataTypes = unref(_options.dataTypes)
        isDataTypeIncluded = typeof dataTypes === 'function'
          ? dataTypes(types)
          : dataTypes
            ? dataTypes.some(item => types.includes(item))
            : true
        if (!isDataTypeIncluded)
          return
      }
      event.preventDefault()
      counter += 1
      isOverDropZone.value = true
      const files = getFiles(event)
      _options.onEnter?.(files, event)
    })
    useEventListener<DragEvent>(target, 'dragover', (event) => {
      if (!isDataTypeIncluded)
        return
      event.preventDefault()
      const files = getFiles(event)
      _options.onOver?.(files, event)
    })
    useEventListener<DragEvent>(target, 'dragleave', (event) => {
      if (!isDataTypeIncluded)
        return
      event.preventDefault()
      counter -= 1
      if (counter === 0)
        isOverDropZone.value = false
      const files = getFiles(event)
      _options.onLeave?.(files, event)
    })
    useEventListener<DragEvent>(target, 'drop', (event) => {
      event.preventDefault()
      counter = 0
      isOverDropZone.value = false
      const files = getFiles(event)
      _options.onDrop?.(files, event)
    })
  }

  return {
    files,
    isOverDropZone,
  }
}
