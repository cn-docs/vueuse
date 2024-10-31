import type { Pausable } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { timestamp, useIntervalFn } from '@vueuse/shared'
import { ref } from 'vue-demi'
import { useRafFn } from '../useRafFn'

export interface UseTimestampOptions<Controls extends boolean> {
  /**
   * 暴露更多控制选项
   *
   * @default false
   */
  controls?: Controls

  /**
   * 添加到值的偏移量
   *
   * @default 0
   */
  offset?: number

  /**
   * 立即更新时间戳
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 更新间隔，或使用 requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: 'requestAnimationFrame' | number
  /**
   * 每次更新时的回调函数
   */
  callback?: (timestamp: number) => void
}

/**
 * 响应式的当前时间戳。
 *
 * @see https://vueuse.org/useTimestamp
 * @param options
 */
export function useTimestamp(options?: UseTimestampOptions<false>): Ref<number>
export function useTimestamp(options: UseTimestampOptions<true>): { timestamp: Ref<number> } & Pausable
export function useTimestamp(options: UseTimestampOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    offset = 0,
    immediate = true,
    interval = 'requestAnimationFrame',
    callback,
  } = options

  const ts = ref(timestamp() + offset)

  const update = () => ts.value = timestamp() + offset
  const cb = callback
    ? () => {
        update()
        callback(ts.value)
      }
    : update

  const controls: Pausable = interval === 'requestAnimationFrame'
    ? useRafFn(cb, { immediate })
    : useIntervalFn(cb, interval, { immediate })

  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls,
    }
  }
  else {
    return ts
  }
}

export type UseTimestampReturn = ReturnType<typeof useTimestamp>
