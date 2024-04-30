import type { ComputedRef, Ref, UnwrapNestedRefs } from 'vue-demi'
import { computed, isReadonly, isRef, reactive, watch } from 'vue-demi'
import { noop, syncRef, toValue } from '@vueuse/shared'
import type { MaybeRef, MaybeRefOrGetter } from '@vueuse/shared'
import { useClamp } from '../../math/useClamp'

export interface UseOffsetPaginationOptions {
  /**
   * 总项目数。
   */
  total?: MaybeRefOrGetter<number>

  /**
   * 每页显示的项目数。
   * @default 10
   */
  pageSize?: MaybeRefOrGetter<number>

  /**
   * 当前页码。
   * @default 1
   */
  page?: MaybeRef<number>

  /**
   * 当 `page` 改变时的回调函数。
   */
  onPageChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown

  /**
   * 当 `pageSize` 改变时的回调函数。
   */
  onPageSizeChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown

  /**
   * 当 `pageCount` 改变时的回调函数。
   */
  onPageCountChange?: (returnValue: UnwrapNestedRefs<UseOffsetPaginationReturn>) => unknown
}

export interface UseOffsetPaginationReturn {
  currentPage: Ref<number>
  currentPageSize: Ref<number>
  pageCount: ComputedRef<number>
  isFirstPage: ComputedRef<boolean>
  isLastPage: ComputedRef<boolean>
  prev: () => void
  next: () => void
}

export type UseOffsetPaginationInfinityPageReturn = Omit<UseOffsetPaginationReturn, 'isLastPage'>

export function useOffsetPagination(options: Omit<UseOffsetPaginationOptions, 'total'>): UseOffsetPaginationInfinityPageReturn
export function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn
export function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn {
  const {
    total = Number.POSITIVE_INFINITY,
    pageSize = 10,
    page = 1,
    onPageChange = noop,
    onPageSizeChange = noop,
    onPageCountChange = noop,
  } = options

  const currentPageSize = useClamp(pageSize, 1, Number.POSITIVE_INFINITY)

  const pageCount = computed(() => Math.max(
    1,
    Math.ceil((toValue(total)) / toValue(currentPageSize)),
  ))

  const currentPage = useClamp(page, 1, pageCount)

  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === pageCount.value)

  if (isRef(page)) {
    syncRef(page, currentPage, {
      direction: isReadonly(page) ? 'ltr' : 'both',
    })
  }

  if (isRef(pageSize)) {
    syncRef(pageSize, currentPageSize, {
      direction: isReadonly(pageSize) ? 'ltr' : 'both',
    })
  }

  function prev() {
    currentPage.value--
  }

  function next() {
    currentPage.value++
  }

  const returnValue = {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
  }

  watch(currentPage, () => {
    onPageChange(reactive(returnValue))
  })

  watch(currentPageSize, () => {
    onPageSizeChange(reactive(returnValue))
  })

  watch(pageCount, () => {
    onPageCountChange(reactive(returnValue))
  })

  return returnValue
}
