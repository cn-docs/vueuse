import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { JwtDecodeOptions, JwtHeader, JwtPayload } from 'jwt-decode'
import type { ComputedRef } from 'vue'
import { toValue } from '@vueuse/shared'
import { jwtDecode } from 'jwt-decode'
import { computed } from 'vue'

export interface UseJwtOptions<Fallback> {
  /**
   * 解码出错时返回的值
   *
   * @default null
   */
  fallbackValue?: Fallback

  /**
   * 解码出错时的错误回调函数
   */
  onError?: (error: unknown) => void
}

export interface UseJwtReturn<Payload, Header, Fallback> {
  header: ComputedRef<Header | Fallback>
  payload: ComputedRef<Payload | Fallback>
}

/**
 * 响应式解码的 JWT token。
 *
 * @see https://vueuse.org/useJwt
 */
export function useJwt<
  Payload extends object = JwtPayload,
  Header extends object = JwtHeader,
  Fallback = null,
>(
  encodedJwt: MaybeRefOrGetter<string>,
  options: UseJwtOptions<Fallback> = {},
): UseJwtReturn<Payload, Header, Fallback> {
  const {
    onError,
    fallbackValue = null,
  } = options

  const decodeWithFallback = <T extends object>(encodedJwt: string, options?: JwtDecodeOptions): T | Fallback => {
    try {
      return jwtDecode<T>(encodedJwt, options)
    }
    catch (err) {
      onError?.(err)
      return fallbackValue as Fallback
    }
  }

  const header = computed(() => decodeWithFallback<Header>(toValue(encodedJwt), { header: true }))
  const payload = computed(() => decodeWithFallback<Payload>(toValue(encodedJwt)))

  return {
    header,
    payload,
  }
}
