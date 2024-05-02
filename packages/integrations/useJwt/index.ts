import type { ComputedRef } from 'vue-demi'
import { computed } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import jwt_decode from 'jwt-decode'
import type { JwtDecodeOptions, JwtHeader, JwtPayload } from 'jwt-decode'

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
      return jwt_decode<T>(encodedJwt, options)
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
