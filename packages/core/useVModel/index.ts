import type { Ref, UnwrapRef, WritableComputedRef } from 'vue'
import { isDef } from '@vueuse/shared'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import type { CloneFn } from '../useCloned'
import { cloneFnJSON } from '../useCloned'

export interface UseVModelOptions<T, Passive extends boolean = false> {
  /**
   * 当 passive 设置为 `true` 时，将使用 `watch` 来同步 props 和 ref，
   * 而不是依赖 `v-model` 或 `.sync` 来工作。
   *
   * @default false
   */
  passive?: Passive
  /**
   * 当设置 eventName 时，其值将用于覆盖触发事件的名称。
   *
   * @default undefined
   */
  eventName?: string
  /**
   * 尝试检查深层嵌套对象或数组中属性的变化。
   * 仅在 `passive` 选项设置为 `true` 时适用
   *
   * @default false
   */
  deep?: boolean
  /**
   * 当没有传入值时，为返回的 ref 定义默认值。
   *
   * @default undefined
   */
  defaultValue?: T
  /**
   * 克隆 props。
   * 接受自定义克隆函数。
   * 当设置为 `true` 时，将使用 `JSON.parse(JSON.stringify(value))` 进行克隆。
   *
   * @default false
   */
  clone?: boolean | CloneFn<T>
  /**
   * 触发 emit 事件前的钩子函数，可用于表单验证。
   * 如果返回 false，则不会触发 emit 事件。
   *
   * @default undefined
   */
  shouldEmit?: (v: T) => boolean
}

export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<P[K], false>,
): WritableComputedRef<P[K]>

export function useVModel<P extends object, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options?: UseVModelOptions<P[K], true>,
): Ref<UnwrapRef<P[K]>>

/**
 * v-model 绑定的简写方式，将 props + emit 转换为 ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param key (默认值 'modelValue')
 * @param emit
 */
export function useVModel<P extends object, K extends keyof P, Name extends string, Passive extends boolean>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
  options: UseVModelOptions<P[K], Passive> = {},
) {
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit,
  } = options

  const vm = getCurrentInstance()
  // @ts-expect-error mis-alignment with @vue/composition-api
  const _emit = emit || vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy)
  let event: string | undefined = eventName

  if (!key) {
    key = 'modelValue' as K
  }

  event = event || `update:${key!.toString()}`

  const cloneFn = (val: P[K]) => !clone
    ? val
    : typeof clone === 'function'
      ? clone(val)
      : cloneFnJSON(val)

  const getValue = () => isDef(props[key!])
    ? cloneFn(props[key!])
    : defaultValue

  const triggerEmit = (value: P[K]) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value)
    }
    else {
      _emit(event, value)
    }
  }

  if (passive) {
    const initialValue = getValue()
    const proxy = ref<P[K]>(initialValue!)
    let isUpdating = false

    watch(
      () => props[key!],
      (v) => {
        if (!isUpdating) {
          isUpdating = true
          ;(proxy as any).value = cloneFn(v) as UnwrapRef<P[K]>
          nextTick(() => isUpdating = false)
        }
      },
    )

    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key!] || deep))
          triggerEmit(v as P[K])
      },
      { deep },
    )

    return proxy
  }
  else {
    return computed<P[K]>({
      get() {
        return getValue()!
      },
      set(value) {
        triggerEmit(value)
      },
    })
  }
}
