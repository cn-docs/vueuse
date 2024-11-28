import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { Ref, WatchOptions } from 'vue'
import { toValue } from '@vueuse/shared'
import { isRef, ref, watch } from 'vue'

export interface UseClonedOptions<T = any> extends WatchOptions {
  /**
   * 自定义克隆函数。
   *
   * 默认情况下，它使用 `JSON.parse(JSON.stringify(value))` 进行克隆。
   */
  clone?: (source: T) => T

  /**
   * 手动同步 ref
   *
   * @default false
   */
  manual?: boolean
}

export interface UseClonedReturn<T> {
  /**
   * 克隆的 ref
   */
  cloned: Ref<T>
  /**
   * 手动将克隆的数据与源同步
   */
  sync: () => void
}

export type CloneFn<F, T = F> = (x: F) => T

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

export function useCloned<T>(
  source: MaybeRefOrGetter<T>,
  options: UseClonedOptions = {},
): UseClonedReturn<T> {
  const cloned = ref({} as T) as Ref<T>
  const {
    manual,
    clone = cloneFnJSON,
    // watch options
    deep = true,
    immediate = true,
  } = options

  function sync() {
    cloned.value = clone(toValue(source))
  }

  if (!manual && (isRef(source) || typeof source === 'function')) {
    watch(source, sync, {
      ...options,
      deep,
      immediate,
    })
  }
  else {
    sync()
  }

  return { cloned, sync }
}
