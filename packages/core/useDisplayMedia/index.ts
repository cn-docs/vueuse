import type { MaybeRef } from '@vueuse/shared'
import type { Ref } from 'vue'
import { ref, shallowRef, watch } from 'vue'
import type { ConfigurableNavigator } from '../_configurable'
import { defaultNavigator } from '../_configurable'
import { useSupported } from '../useSupported'

export interface UseDisplayMediaOptions extends ConfigurableNavigator {
  /**
   * 流是否已启用
   * @default false
   */
  enabled?: MaybeRef<boolean>

  /**
   * 流的视频媒体约束条件
   */
  video?: boolean | MediaTrackConstraints | undefined
  /**
   * 流的音频媒体约束条件
   */
  audio?: boolean | MediaTrackConstraints | undefined
}

/**
 * 响应式 `mediaDevices.getDisplayMedia` 获取屏幕共享流
 *
 * @see https://vueuse.org/useDisplayMedia
 * @param options
 */
export function useDisplayMedia(options: UseDisplayMediaOptions = {}) {
  const enabled = ref(options.enabled ?? false)
  const video = options.video
  const audio = options.audio
  const { navigator = defaultNavigator } = options
  const isSupported = useSupported(() => navigator?.mediaDevices?.getDisplayMedia)

  const constraint: MediaStreamConstraints = { audio, video }

  const stream: Ref<MediaStream | undefined> = shallowRef()

  async function _start() {
    if (!isSupported.value || stream.value)
      return
    stream.value = await navigator!.mediaDevices.getDisplayMedia(constraint)
    stream.value?.getTracks().forEach(t => t.addEventListener('ended', stop))
    return stream.value
  }

  async function _stop() {
    stream.value?.getTracks().forEach(t => t.stop())
    stream.value = undefined
  }

  function stop() {
    _stop()
    enabled.value = false
  }

  async function start() {
    await _start()
    if (stream.value)
      enabled.value = true
    return stream.value
  }

  watch(
    enabled,
    (v) => {
      if (v)
        _start()
      else
        _stop()
    },
    { immediate: true },
  )

  return {
    isSupported,
    stream,
    start,
    stop,
    enabled,
  }
}

export type UseDisplayMediaReturn = ReturnType<typeof useDisplayMedia>
