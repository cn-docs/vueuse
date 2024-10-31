import type { MaybeRef, MaybeRefOrGetter } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { toRef, toValue } from '@vueuse/shared'
import { computed, shallowRef, watch } from 'vue-demi'

export interface UseCycleListOptions<T> {
  /**
   * 状态的初始值。
   * 可以提供一个 ref 来重用。
   */
  initialValue?: MaybeRef<T>

  /**
   * 当找不到索引时的默认索引。
   */
  fallbackIndex?: number

  /**
   * 获取当前值的索引的自定义函数。
   */
  getIndexOf?: (value: T, list: T[]) => number
}

/**
 * 循环浏览列表
 *
 * @see https://vueuse.org/useCycleList
 */
export function useCycleList<T>(list: MaybeRefOrGetter<T[]>, options?: UseCycleListOptions<T>): UseCycleListReturn<T> {
  const state = shallowRef(getInitialValue()) as Ref<T>
  const listRef = toRef(list)

  const index = computed<number>({
    get() {
      const targetList = listRef.value

      let index = options?.getIndexOf
        ? options.getIndexOf(state.value, targetList)
        : targetList.indexOf(state.value)

      if (index < 0)
        index = options?.fallbackIndex ?? 0

      return index
    },
    set(v) {
      set(v)
    },
  })

  function set(i: number) {
    const targetList = listRef.value
    const length = targetList.length
    const index = (i % length + length) % length
    const value = targetList[index]
    state.value = value
    return value
  }

  function shift(delta = 1) {
    return set(index.value + delta)
  }

  function next(n = 1) {
    return shift(n)
  }

  function prev(n = 1) {
    return shift(-n)
  }

  function getInitialValue() {
    return toValue(options?.initialValue ?? toValue<T[]>(list)[0]) ?? undefined
  }

  watch(listRef, () => set(index.value))

  return {
    state,
    index,
    next,
    prev,
    go: set,
  }
}

export interface UseCycleListReturn<T> {
  state: Ref<T>
  index: Ref<number>
  next: (n?: number) => T
  prev: (n?: number) => T
  /**
   * Go to a specific index
   */
  go: (i: number) => T
}
