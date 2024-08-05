import { ref, watch, watchEffect } from 'vue-demi'
import type { Fn, MaybeRef, MaybeRefOrGetter } from '@vueuse/shared'
import { createEventHook, isObject, toRef, toValue, tryOnScopeDispose, watchIgnorable } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'
import type { ConfigurableDocument } from '../_configurable'
import { defaultDocument } from '../_configurable'

/**
 * 这里的许多 jsdoc 定义都是修改自 MDN 的文档（https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement）的版本
 */

export interface UseMediaSource {
  /**
   * 媒体的源 URL
   */
  src: string

  /**
   * 媒体的编解码器类型
   */
  type?: string
}

export interface UseMediaTextTrackSource {
  /**
   * 指示除非用户的偏好指示其他轨道更合适，否则轨道应启用
   */
  default?: boolean

  /**
   * 文本轨道的使用方式。如果省略，则默认类型是字幕。
   */
  kind: TextTrackKind

  /**
   * 文本轨道的用户可读标题，在列出可用文本轨道时浏览器使用
   */
  label: string

  /**
   * 轨道的地址（.vtt 文件）。必须是有效的 URL。必须指定此属性，其 URL 值必须与文档具有相同的来源。
   */
  src: string

  /**
   * 轨道文本数据的语言。它必须是有效的 BCP 47 语言标签。
   * 如果 kind 属性设置为 subtitles，则必须定义 srclang。
   */
  srcLang: string
}

interface UseMediaControlsOptions extends ConfigurableDocument {
  /**
   * 媒体的源，可以是字符串、`UseMediaSource` 对象或 `UseMediaSource` 对象的列表
   */
  src?: MaybeRefOrGetter<string | UseMediaSource | UseMediaSource[]>

  /**
   * 媒体的文本轨道列表
   */
  tracks?: MaybeRefOrGetter<UseMediaTextTrackSource[]>
}

export interface UseMediaTextTrack {
  /**
   * 文本轨道的索引
   */
  id: number

  /**
   * 文本轨道的标签
   */
  label: string

  /**
   * 轨道文本数据的语言。它必须是有效的 BCP 47 语言标签。
   * 如果 kind 属性设置为 subtitles，则必须定义 srclang。
   */
  language: string

  /**
   * 指定文本轨道的显示模式，可以是 `disabled`、`hidden` 或 `showing`
   */
  mode: TextTrackMode

  /**
   * 文本轨道的带内元数据轨道调度类型
   */
  inBandMetadataTrackDispatchType: string

  /**
   * 文本轨道的提示列表
   */
  cues: TextTrackCueList | null

  /**
   * 活动文本轨道提示的列表
   */
  activeCues: TextTrackCueList | null
}

/**
 * Automatically check if the ref exists and if it does run the cb fn
 */
function usingElRef<T = any>(source: MaybeRefOrGetter<any>, cb: (el: T) => void) {
  if (toValue(source))
    cb(toValue(source))
}

/**
 * Converts a TimeRange object to an array
 */
function timeRangeToArray(timeRanges: TimeRanges) {
  let ranges: [number, number][] = []

  for (let i = 0; i < timeRanges.length; ++i)
    ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]]

  return ranges
}

/**
 * Converts a TextTrackList object to an array of `UseMediaTextTrack`
 */
function tracksToArray(tracks: TextTrackList): UseMediaTextTrack[] {
  return Array.from(tracks)
    .map(({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({ id, label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }))
}

const defaultOptions: UseMediaControlsOptions = {
  src: '',
  tracks: [],
}

export function useMediaControls(target: MaybeRef<HTMLMediaElement | null | undefined>, options: UseMediaControlsOptions = {}) {
  target = toRef(target)
  options = {
    ...defaultOptions,
    ...options,
  }

  const {
    document = defaultDocument,
  } = options

  const currentTime = ref(0)
  const duration = ref(0)
  const seeking = ref(false)
  const volume = ref(1)
  const waiting = ref(false)
  const ended = ref(false)
  const playing = ref(false)
  const rate = ref(1)
  const stalled = ref(false)
  const buffered = ref<[number, number][]>([])
  const tracks = ref<UseMediaTextTrack[]>([])
  const selectedTrack = ref<number>(-1)
  const isPictureInPicture = ref(false)
  const muted = ref(false)

  const supportsPictureInPicture = document && 'pictureInPictureEnabled' in document

  // Events
  const sourceErrorEvent = createEventHook<Event>()

  /**
   * Disables the specified track. If no track is specified then
   * all tracks will be disabled
   *
   * @param track The id of the track to disable
   */
  const disableTrack = (track?: number | UseMediaTextTrack) => {
    usingElRef<HTMLMediaElement>(target, (el) => {
      if (track) {
        const id = typeof track === 'number' ? track : track.id
        el.textTracks[id].mode = 'disabled'
      }
      else {
        for (let i = 0; i < el.textTracks.length; ++i)
          el.textTracks[i].mode = 'disabled'
      }

      selectedTrack.value = -1
    })
  }

  /**
   * Enables the specified track and disables the
   * other tracks unless otherwise specified
   *
   * @param track The track of the id of the track to enable
   * @param disableTracks Disable all other tracks
   */
  const enableTrack = (track: number | UseMediaTextTrack, disableTracks = true) => {
    usingElRef<HTMLMediaElement>(target, (el) => {
      const id = typeof track === 'number' ? track : track.id

      if (disableTracks)
        disableTrack()

      el.textTracks[id].mode = 'showing'
      selectedTrack.value = id
    })
  }
  /**
   * Toggle picture in picture mode for the player.
   */
  const togglePictureInPicture = () => {
    return new Promise((resolve, reject) => {
      usingElRef<HTMLVideoElement>(target, async (el) => {
        if (supportsPictureInPicture) {
          if (!isPictureInPicture.value) {
            (el as any).requestPictureInPicture()
              .then(resolve)
              .catch(reject)
          }
          else {
            (document as any).exitPictureInPicture()
              .then(resolve)
              .catch(reject)
          }
        }
      })
    })
  }

  /**
   * This will automatically inject sources to the media element. The sources will be
   * appended as children to the media element as `<source>` elements.
   */
  watchEffect(() => {
    if (!document)
      return

    const el = toValue(target)
    if (!el)
      return

    const src = toValue(options.src)
    let sources: UseMediaSource[] = []

    if (!src)
      return

    // Merge sources into an array
    if (typeof src === 'string')
      sources = [{ src }]
    else if (Array.isArray(src))
      sources = src
    else if (isObject(src))
      sources = [src]

    // Clear the sources
    el.querySelectorAll('source').forEach((e) => {
      e.removeEventListener('error', sourceErrorEvent.trigger)
      e.remove()
    })

    // Add new sources
    sources.forEach(({ src, type }) => {
      const source = document.createElement('source')

      source.setAttribute('src', src)
      source.setAttribute('type', type || '')

      source.addEventListener('error', sourceErrorEvent.trigger)

      el.appendChild(source)
    })

    // Finally, load the new sources.
    el.load()
  })

  // Remove source error listeners
  tryOnScopeDispose(() => {
    const el = toValue(target)
    if (!el)
      return

    el.querySelectorAll('source').forEach(e => e.removeEventListener('error', sourceErrorEvent.trigger))
  })

  /**
   * Apply composable state to the element, also when element is changed
   */
  watch([target, volume], () => {
    const el = toValue(target)
    if (!el)
      return

    el.volume = volume.value
  })

  watch([target, muted], () => {
    const el = toValue(target)
    if (!el)
      return

    el.muted = muted.value
  })

  watch([target, rate], () => {
    const el = toValue(target)
    if (!el)
      return

    el.playbackRate = rate.value
  })

  /**
   * Load Tracks
   */
  watchEffect(() => {
    if (!document)
      return

    const textTracks = toValue(options.tracks)
    const el = toValue(target)

    if (!textTracks || !textTracks.length || !el)
      return

    /**
     * The MediaAPI provides an API for adding text tracks, but they don't currently
     * have an API for removing text tracks, so instead we will just create and remove
     * the tracks manually using the HTML api.
     */
    el.querySelectorAll('track').forEach(e => e.remove())

    textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
      const track = document.createElement('track')

      track.default = isDefault || false
      track.kind = kind
      track.label = label
      track.src = src
      track.srclang = srcLang

      if (track.default)
        selectedTrack.value = i

      el.appendChild(track)
    })
  })

  /**
   * This will allow us to update the current time from the timeupdate event
   * without setting the medias current position, but if the user changes the
   * current time via the ref, then the media will seek.
   *
   * If we did not use an ignorable watch, then the current time update from
   * the timeupdate event would cause the media to stutter.
   */
  const { ignoreUpdates: ignoreCurrentTimeUpdates } = watchIgnorable(currentTime, (time) => {
    const el = toValue(target)
    if (!el)
      return

    el.currentTime = time
  })

  /**
   * Using an ignorable watch so we can control the play state using a ref and not
   * a function
   */
  const { ignoreUpdates: ignorePlayingUpdates } = watchIgnorable(playing, (isPlaying) => {
    const el = toValue(target)
    if (!el)
      return

    if (isPlaying)
      el.play()
    else
      el.pause()
  })

  useEventListener(target, 'timeupdate', () => ignoreCurrentTimeUpdates(() => currentTime.value = (toValue(target))!.currentTime))
  useEventListener(target, 'durationchange', () => duration.value = (toValue(target))!.duration)
  useEventListener(target, 'progress', () => buffered.value = timeRangeToArray((toValue(target))!.buffered))
  useEventListener(target, 'seeking', () => seeking.value = true)
  useEventListener(target, 'seeked', () => seeking.value = false)
  useEventListener(target, ['waiting', 'loadstart'], () => {
    waiting.value = true
    ignorePlayingUpdates(() => playing.value = false)
  })
  useEventListener(target, 'loadeddata', () => waiting.value = false)
  useEventListener(target, 'playing', () => {
    waiting.value = false
    ended.value = false
    ignorePlayingUpdates(() => playing.value = true)
  })
  useEventListener(target, 'ratechange', () => rate.value = (toValue(target))!.playbackRate)
  useEventListener(target, 'stalled', () => stalled.value = true)
  useEventListener(target, 'ended', () => ended.value = true)
  useEventListener(target, 'pause', () => ignorePlayingUpdates(() => playing.value = false))
  useEventListener(target, 'play', () => ignorePlayingUpdates(() => playing.value = true))
  useEventListener(target, 'enterpictureinpicture', () => isPictureInPicture.value = true)
  useEventListener(target, 'leavepictureinpicture', () => isPictureInPicture.value = false)
  useEventListener(target, 'volumechange', () => {
    const el = toValue(target)
    if (!el)
      return

    volume.value = el.volume
    muted.value = el.muted
  })

  /**
   * The following listeners need to listen to a nested
   * object on the target, so we will have to use a nested
   * watch and manually remove the listeners
   */
  const listeners: Fn[] = []

  const stop = watch([target], () => {
    const el = toValue(target)
    if (!el)
      return

    stop()

    listeners[0] = useEventListener(el.textTracks, 'addtrack', () => tracks.value = tracksToArray(el.textTracks))
    listeners[1] = useEventListener(el.textTracks, 'removetrack', () => tracks.value = tracksToArray(el.textTracks))
    listeners[2] = useEventListener(el.textTracks, 'change', () => tracks.value = tracksToArray(el.textTracks))
  })

  // Remove text track listeners
  tryOnScopeDispose(() => listeners.forEach(listener => listener()))

  return {
    currentTime,
    duration,
    waiting,
    seeking,
    ended,
    stalled,
    buffered,
    playing,
    rate,

    // Volume
    volume,
    muted,

    // Tracks
    tracks,
    selectedTrack,
    enableTrack,
    disableTrack,

    // Picture in Picture
    supportsPictureInPicture,
    togglePictureInPicture,
    isPictureInPicture,

    // Events
    onSourceError: sourceErrorEvent.on,
  }
}

export type UseMediaControlsReturn = ReturnType<typeof useMediaControls>
