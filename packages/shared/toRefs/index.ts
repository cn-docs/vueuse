import type { ToRefs } from 'vue'
import { toRefs as _toRefs, customRef, isRef } from 'vue'
import type { MaybeRef, MaybeRefOrGetter } from '../utils'
import { toValue } from '../toValue'

export interface ToRefsOptions {
  /**
   * 当属性更新时，是否用副本替换原始的 ref。
   *
   * @default true
   */
  replaceRef?: MaybeRefOrGetter<boolean>
}

/**
 * 扩展的 `toRefs`，还接受对象的 ref。
 *
 * @see https://vueuse.org/toRefs
 * @param objectRef 一个 ref 或普通对象或数组。
 */
export function toRefs<T extends object>(
  objectRef: MaybeRef<T>,
  options: ToRefsOptions = {},
): ToRefs<T> {
  if (!isRef(objectRef))
    return _toRefs(objectRef)

  const result: any = Array.isArray(objectRef.value)
    ? Array.from({ length: objectRef.value.length })
    : {}

  for (const key in objectRef.value) {
    result[key] = customRef<T[typeof key]>(() => ({
      get() {
        return objectRef.value[key]
      },
      set(v) {
        const replaceRef = toValue(options.replaceRef) ?? true

        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy: any = [...objectRef.value]
            copy[key] = v
            objectRef.value = copy
          }
          else {
            const newObject = { ...objectRef.value, [key]: v }

            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value))

            objectRef.value = newObject
          }
        }
        else {
          objectRef.value[key] = v
        }
      },
    }))
  }
  return result
}
