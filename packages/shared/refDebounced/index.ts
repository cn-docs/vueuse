import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import type { DebounceFilterOptions, MaybeRefOrGetter } from '../utils'
import { useDebounceFn } from '../useDebounceFn'

/**
 * 对 ref 的更新进行防抖。
 *
 * @return 一个新的防抖 Ref
 */
export function refDebounced<T>(value: Ref<T>, ms: MaybeRefOrGetter<number> = 200, options: DebounceFilterOptions = {}): Readonly<Ref<T>> {
  const debounced = ref(value.value as T) as Ref<T>

  const updater = useDebounceFn(() => {
    debounced.value = value.value
  }, ms, options)

  watch(value, () => updater())

  return debounced
}

// alias
export {
  refDebounced as useDebounce,
  refDebounced as debouncedRef,
}
