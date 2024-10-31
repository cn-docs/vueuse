import type { MaybeRefOrGetter, Pausable } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeComputedElementRef, MaybeElement } from '../unrefElement'
import { noop, notNullish, toValue, tryOnScopeDispose } from '@vueuse/shared'
import { computed, ref, watch } from 'vue-demi'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { useSupported } from '../useSupported'

export interface UseIntersectionObserverOptions extends ConfigurableWindow {
  /**
   * 在创建时立即启动 IntersectionObserver
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 用作边界框的元素或文档，用于测试相交时使用的边界框。
   */
  root?: MaybeComputedElementRef | Document

  /**
   * 一个字符串，指定计算相交时要添加到根边界框的偏移量集。
   */
  rootMargin?: string

  /**
   * 单个数字或介于 0.0 和 1 之间的数字数组。
   * @default 0
   */
  threshold?: number | number[]
}

export interface UseIntersectionObserverReturn extends Pausable {
  isSupported: Ref<boolean>
  stop: () => void
}

/**
 * 检测目标元素的可见性。
 *
 * @see https://vueuse.org/useIntersectionObserver
 * @param target
 * @param callback
 * @param options
 */
export function useIntersectionObserver(
  target: MaybeComputedElementRef | MaybeRefOrGetter<MaybeElement[]> | MaybeComputedElementRef[],
  callback: IntersectionObserverCallback,
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const {
    root,
    rootMargin = '0px',
    threshold = 0,
    window = defaultWindow,
    immediate = true,
  } = options

  const isSupported = useSupported(() => window && 'IntersectionObserver' in window)
  const targets = computed(() => {
    const _target = toValue(target)
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish)
  })

  let cleanup = noop
  const isActive = ref(immediate)

  const stopWatch = isSupported.value
    ? watch(
      () => [targets.value, unrefElement(root as MaybeComputedElementRef), isActive.value] as const,
      ([targets, root]) => {
        cleanup()
        if (!isActive.value)
          return

        if (!targets.length)
          return

        const observer = new IntersectionObserver(
          callback,
          {
            root: unrefElement(root),
            rootMargin,
            threshold,
          },
        )

        targets.forEach(el => el && observer.observe(el))

        cleanup = () => {
          observer.disconnect()
          cleanup = noop
        }
      },
      { immediate, flush: 'post' },
    )
    : noop

  const stop = () => {
    cleanup()
    stopWatch()
    isActive.value = false
  }

  tryOnScopeDispose(stop)

  return {
    isSupported,
    isActive,
    pause() {
      cleanup()
      isActive.value = false
    },
    resume() {
      isActive.value = true
    },
    stop,
  }
}
