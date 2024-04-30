import { useNetwork } from '../useNetwork'
import type { ConfigurableWindow } from '../_configurable'

/**
 * 响应式在线状态。
 *
 * @see https://vueuse.org/useOnline
 * @param options
 */
export function useOnline(options: ConfigurableWindow = {}) {
  const { isOnline } = useNetwork(options)
  return isOnline
}
