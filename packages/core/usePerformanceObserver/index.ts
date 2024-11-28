import { tryOnScopeDispose } from '@vueuse/shared'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useSupported } from '../useSupported'

export type UsePerformanceObserverOptions = PerformanceObserverInit & ConfigurableWindow & {
  /**
   * 立即启动观察者
   *
   * @default true
   */
  immediate?: boolean
}

/**
 * 观察性能指标
 * Observe performance metrics.
 *
 * @see https://vueuse.org/usePerformanceObserver
 * @param options
 */
export function usePerformanceObserver(options: UsePerformanceObserverOptions, callback: PerformanceObserverCallback) {
  const {
    window = defaultWindow,
    immediate = true,
    ...performanceOptions
  } = options

  const isSupported = useSupported(() => window && 'PerformanceObserver' in window)

  let observer: PerformanceObserver | undefined

  const stop = () => {
    observer?.disconnect()
  }

  const start = () => {
    if (isSupported.value) {
      stop()
      observer = new PerformanceObserver(callback)
      observer.observe(performanceOptions)
    }
  }

  tryOnScopeDispose(stop)

  if (immediate)
    start()

  return {
    isSupported,
    start,
    stop,
  }
}
