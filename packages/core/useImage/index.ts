import { watch } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { toValue } from '@vueuse/shared'
import type { UseAsyncStateOptions } from '../useAsyncState'
import { useAsyncState } from '../useAsyncState'

export interface UseImageOptions {
  /** 资源的地址 */
  src: string
  /** 不同情况下使用的图片，例如高分辨率显示器、小型监视器等 */
  srcset?: string
  /** 不同页面布局的图片尺寸 */
  sizes?: string
  /** 图片的替代信息 */
  alt?: string
  /** 图片的类名 */
  class?: string
  /** 图片的加载方式 */
  loading?: HTMLImageElement['loading']
  /** 图片的跨域设置 */
  crossorigin?: string
  /** 获取者策略用于获取资源 */
  referrerPolicy?: HTMLImageElement['referrerPolicy']
}

async function loadImage(options: UseImageOptions): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy } = options

    img.src = src

    if (srcset)
      img.srcset = srcset

    if (sizes)
      img.sizes = sizes

    if (clazz)
      img.className = clazz

    if (loading)
      img.loading = loading

    if (crossorigin)
      img.crossOrigin = crossorigin

    if (referrerPolicy)
      img.referrerPolicy = referrerPolicy

    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

/**
 * Reactive load an image in the browser, you can wait the result to display it or show a fallback.
 *
 * @see https://vueuse.org/useImage
 * @param options Image attributes, as used in the <img> tag
 * @param asyncStateOptions
 */
export function useImage<Shallow extends true>(options: MaybeRefOrGetter<UseImageOptions>, asyncStateOptions: UseAsyncStateOptions<Shallow> = {}) {
  const state = useAsyncState<HTMLImageElement | undefined>(
    () => loadImage(toValue(options)),
    undefined,
    {
      resetOnExecute: true,
      ...asyncStateOptions,
    },
  )

  watch(
    () => toValue(options),
    () => state.execute(asyncStateOptions.delay),
    { deep: true },
  )

  return state
}

export type UseImageReturn = ReturnType<typeof useImage>
