import type { Ref } from 'vue-demi'
import type { MaybeRefOrGetter, Pausable } from '../utils'
import { ref } from 'vue-demi'
import { useIntervalFn } from '../useIntervalFn'

export interface UseIntervalOptions<Controls extends boolean> {
  /**
   * 暴露更多控制选项
   *
   * @default false
   */
  controls?: Controls

  /**
   * 在调用时立即执行更新
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 每个间隔上的回调函数
   */
  callback?: (count: number) => void
}

export interface UseIntervalControls {
  counter: Ref<number>
  reset: () => void
}

/**
 * 每个间隔上增加的响应式计数器
 *
 * @see https://vueuse.org/useInterval
 * @param interval
 * @param options
 */
export function useInterval(interval?: MaybeRefOrGetter<number>, options?: UseIntervalOptions<false>): Ref<number>
export function useInterval(interval: MaybeRefOrGetter<number>, options: UseIntervalOptions<true>): UseIntervalControls & Pausable
export function useInterval(interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    immediate = true,
    callback,
  } = options

  const counter = ref(0)
  const update = () => counter.value += 1
  const reset = () => {
    counter.value = 0
  }
  const controls = useIntervalFn(
    callback
      ? () => {
          update()
          callback(counter.value)
        }
      : update,
    interval,
    { immediate },
  )

  if (exposeControls) {
    return {
      counter,
      reset,
      ...controls,
    }
  }
  else {
    return counter
  }
}
