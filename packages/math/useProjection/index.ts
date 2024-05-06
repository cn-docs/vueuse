import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ProjectorFunction } from '../createGenericProjection'
import { createProjection } from '../createProjection'

/**
 * 从一个域映射到另一个域的响应式数值投影。
 *
 * @see https://vueuse.org/useProjection
 */
export function useProjection(
  input: MaybeRefOrGetter<number>,
  fromDomain: MaybeRefOrGetter<readonly [number, number]>,
  toDomain: MaybeRefOrGetter<readonly [number, number]>,
  projector?: ProjectorFunction<number, number>,
) {
  return createProjection(fromDomain, toDomain, projector)(input)
}
