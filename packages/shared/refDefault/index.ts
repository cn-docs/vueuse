import type { Ref } from 'vue'
import { computed } from 'vue'

/**
 * 将默认值应用于 ref。
 */
export function refDefault<T>(source: Ref<T | undefined | null>, defaultValue: T): Ref<T> {
  return computed({
    get() {
      return source.value ?? defaultValue
    },
    set(value) {
      source.value = value
    },
  })
}
