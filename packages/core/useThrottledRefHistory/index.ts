import type { MaybeRef } from '@vueuse/shared'
import type { Ref } from 'vue'
import { throttleFilter } from '@vueuse/shared'
import type { UseRefHistoryOptions, UseRefHistoryReturn } from '../useRefHistory'
import { useRefHistory } from '../useRefHistory'

export type UseThrottledRefHistoryOptions<Raw, Serialized = Raw> = Omit<UseRefHistoryOptions<Raw, Serialized>, 'eventFilter'> & { throttle?: MaybeRef<number>, trailing?: boolean }

export type UseThrottledRefHistoryReturn<Raw, Serialized = Raw> = UseRefHistoryReturn<Raw, Serialized>

/**
 * 带节流功能的 useRefHistory 的简写。
 *
 * @see https://vueuse.org/useThrottledRefHistory
 * @param source
 * @param options
 */
export function useThrottledRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options: UseThrottledRefHistoryOptions<Raw, Serialized> = {},
): UseThrottledRefHistoryReturn<Raw, Serialized> {
  const { throttle = 200, trailing = true } = options
  const filter = throttleFilter(throttle, trailing)
  const history = useRefHistory(source, { ...options, eventFilter: filter })

  return {
    ...history,
  }
}
