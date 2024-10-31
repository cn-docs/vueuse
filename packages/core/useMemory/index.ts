import type { UseIntervalFnOptions } from '@vueuse/shared'
import { useIntervalFn } from '@vueuse/shared'
import { ref } from 'vue-demi'
import { useSupported } from '../useSupported'

/**
 * Performance.memory
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory
 */
export interface MemoryInfo {
  /**
   * 上下文可用的堆的最大大小（以字节为单位）。
   */
  readonly jsHeapSizeLimit: number
  /**
   * 分配的堆的总大小（以字节为单位）。
   */
  readonly totalJSHeapSize: number
  /**
   * 当前活动的 JS 堆段大小（以字节为单位）。
   */
  readonly usedJSHeapSize: number

  [Symbol.toStringTag]: 'MemoryInfo'
}

export interface UseMemoryOptions extends UseIntervalFnOptions {
  interval?: number
}

type PerformanceMemory = Performance & {
  memory: MemoryInfo
}

/**
 * 响应式内存信息
 *
 * @see https://vueuse.org/useMemory
 * @param options
 */
export function useMemory(options: UseMemoryOptions = {}) {
  const memory = ref<MemoryInfo>()
  const isSupported = useSupported(() => typeof performance !== 'undefined' && 'memory' in performance)

  if (isSupported.value) {
    const { interval = 1000 } = options
    useIntervalFn(() => {
      memory.value = (performance as PerformanceMemory).memory
    }, interval, { immediate: options.immediate, immediateCallback: options.immediateCallback })
  }

  return { isSupported, memory }
}

export type UseMemoryReturn = ReturnType<typeof useMemory>
