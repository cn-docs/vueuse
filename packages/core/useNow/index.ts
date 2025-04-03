import type { Pausable } from '@vueuse/shared'
import type { Ref } from 'vue'
import { useIntervalFn } from '@vueuse/shared'
import { ref as deepRef } from 'vue'
import { useRafFn } from '../useRafFn'

export interface UseNowOptions<Controls extends boolean> {
  /**
   * 暴露更多控制选项
   *
   * @default false
   */
  controls?: Controls

  /**
   * 更新间隔，单位为毫秒，或使用 requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: 'requestAnimationFrame' | number
}

/**
 * 反应性当前 Date 实例
 *
 * @see https://vueuse.org/useNow
 * @param options
 */
export function useNow(options?: UseNowOptions<false>): Ref<Date>
export function useNow(options: UseNowOptions<true>): { now: Ref<Date> } & Pausable
export function useNow(options: UseNowOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    interval = 'requestAnimationFrame',
  } = options

  const now = deepRef(new Date())

  const update = () => now.value = new Date()

  const controls: Pausable = interval === 'requestAnimationFrame'
    ? useRafFn(update, { immediate: true })
    : useIntervalFn(update, interval, { immediate: true })

  if (exposeControls) {
    return {
      now,
      ...controls,
    }
  }
  else {
    return now
  }
}

export type UseNowReturn = ReturnType<typeof useNow>
