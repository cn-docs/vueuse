import type { ToRefs } from 'vue'
import type { UseVModelOptions } from '../useVModel'
import { useVModel } from '../useVModel'

/**
 * 用于 props 的 v-model 绑定的简写。类似于 `toRefs(props)`，但更改也会触发 emit。
 *
 * @see https://vueuse.org/useVModels
 * @param props
 * @param emit
 * @param options
 */
export function useVModels<P extends object, Name extends string>(
  props: P,
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<any, true>,
): ToRefs<P>
export function useVModels<P extends object, Name extends string>(
  props: P,
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<any, false>,
): ToRefs<P>
export function useVModels<P extends object, Name extends string, Passive extends boolean>(
  props: P,
  emit?: (name: Name, ...args: any[]) => void,
  options: UseVModelOptions<any, Passive> = {},
): ToRefs<P> {
  const ret: any = {}

  for (const key in props) {
    ret[key] = useVModel(
      props,
      key,
      emit,
      options as Parameters<typeof useVModel>[3],
    )
  }
  return ret
}
