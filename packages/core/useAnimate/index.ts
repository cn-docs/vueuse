import type { ComputedRef, Ref, ShallowRef, WritableComputedRef } from 'vue-demi'
import { computed, nextTick, shallowReactive, shallowRef, watch } from 'vue-demi'
import type { MaybeRef, Mutable } from '@vueuse/shared'
import { isObject, objectOmit, toValue, tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'
import type { MaybeComputedElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useSupported } from '../useSupported'
import { useEventListener } from '../useEventListener'
import { useRafFn } from '../useRafFn'

export interface UseAnimateOptions extends KeyframeAnimationOptions, ConfigurableWindow {
  /**
   * 当使用 `useAnimate` 时，是否自动运行播放
   *
   * @default true
   */
  immediate?: boolean
  /**
   * 是否将动画的结束样式状态提交给被动画的元素
   * 通常情况下，你应该将 `fill` 选项与这个一起使用
   *
   * @default false
   */
  commitStyles?: boolean
  /**
   * 是否持续动画
   *
   * @default false
   */
  persist?: boolean
  /**
   * 在动画初始化后执行
   */
  onReady?: (animate: Animation) => void
  /**
   * 捕获到错误时的回调
   */
  onError?: (e: unknown) => void
}

export type UseAnimateKeyframes = MaybeRef<Keyframe[] | PropertyIndexedKeyframes | null>

export interface UseAnimateReturn {
  isSupported: Ref<boolean>
  animate: ShallowRef<Animation | undefined>
  play: () => void
  pause: () => void
  reverse: () => void
  finish: () => void
  cancel: () => void

  pending: ComputedRef<boolean>
  playState: ComputedRef<AnimationPlayState>
  replaceState: ComputedRef<AnimationReplaceState>
  startTime: WritableComputedRef<CSSNumberish | number | null>
  currentTime: WritableComputedRef<CSSNumberish | null>
  timeline: WritableComputedRef<AnimationTimeline | null>
  playbackRate: WritableComputedRef<number>
}

type AnimateStoreKeys = Extract<keyof Animation, 'startTime' | 'currentTime' | 'timeline' | 'playbackRate' | 'pending' | 'playState' | 'replaceState'>

type AnimateStore = Mutable<Pick<Animation, AnimateStoreKeys>>

/**
 * 响应式 Web Animations API
 *
 * @see https://vueuse.org/useAnimate
 * @param target
 * @param keyframes
 * @param options
 */
export function useAnimate(
  target: MaybeComputedElementRef,
  keyframes: UseAnimateKeyframes,
  options?: number | UseAnimateOptions,
): UseAnimateReturn {
  let config: UseAnimateOptions
  let animateOptions: undefined | number | KeyframeAnimationOptions

  if (isObject(options)) {
    config = options
    animateOptions = objectOmit(options, ['window', 'immediate', 'commitStyles', 'persist', 'onReady', 'onError'])
  }
  else {
    config = { duration: options }
    animateOptions = options
  }

  const {
    window = defaultWindow,
    immediate = true,
    commitStyles,
    persist,
    playbackRate: _playbackRate = 1,
    onReady,
    onError = (e: unknown) => {
      console.error(e)
    },
  } = config

  const isSupported = useSupported(() => window && HTMLElement && 'animate' in HTMLElement.prototype)

  const animate = shallowRef<Animation | undefined>(undefined)
  const store = shallowReactive<AnimateStore>({
    startTime: null,
    currentTime: null,
    timeline: null,
    playbackRate: _playbackRate,
    pending: false,
    playState: immediate ? 'idle' : 'paused',
    replaceState: 'active',
  })

  const pending = computed(() => store.pending)
  const playState = computed(() => store.playState)
  const replaceState = computed(() => store.replaceState)

  const startTime = computed<CSSNumberish | number | null>({
    get() {
      return store.startTime
    },
    set(value) {
      store.startTime = value
      if (animate.value)
        animate.value.startTime = value
    },
  })

  const currentTime = computed({
    get() {
      return store.currentTime
    },
    set(value) {
      store.currentTime = value
      if (animate.value) {
        animate.value.currentTime = value
        syncResume()
      }
    },
  })

  const timeline = computed({
    get() {
      return store.timeline
    },
    set(value) {
      store.timeline = value
      if (animate.value)
        animate.value.timeline = value
    },
  })

  const playbackRate = computed({
    get() {
      return store.playbackRate
    },
    set(value) {
      store.playbackRate = value
      if (animate.value)
        animate.value.playbackRate = value
    },
  })

  const play = () => {
    if (animate.value) {
      try {
        animate.value.play()
        syncResume()
      }
      catch (e) {
        syncPause()
        onError(e)
      }
    }
    else {
      update()
    }
  }

  const pause = () => {
    try {
      animate.value?.pause()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  const reverse = () => {
    !animate.value && update()
    try {
      animate.value?.reverse()
      syncResume()
    }
    catch (e) {
      syncPause()
      onError(e)
    }
  }

  const finish = () => {
    try {
      animate.value?.finish()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  const cancel = () => {
    try {
      animate.value?.cancel()
      syncPause()
    }
    catch (e) {
      onError(e)
    }
  }

  watch(() => unrefElement(target), (el) => {
    el && update()
  })

  watch(() => keyframes, (value) => {
    !animate.value && update()

    if (!unrefElement(target) && animate.value) {
      animate.value.effect = new KeyframeEffect(
        unrefElement(target)!,
        toValue(value),
        animateOptions,
      )
    }
  }, { deep: true })

  tryOnMounted(() => {
    nextTick(() => update(true))
  })

  tryOnScopeDispose(cancel)

  function update(init?: boolean) {
    const el = unrefElement(target)
    if (!isSupported.value || !el)
      return

    if (!animate.value)
      animate.value = el.animate(toValue(keyframes), animateOptions)

    if (persist)
      animate.value.persist()
    if (_playbackRate !== 1)
      animate.value.playbackRate = _playbackRate

    if (init && !immediate)
      animate.value.pause()
    else
      syncResume()

    onReady?.(animate.value)
  }

  useEventListener(animate, ['cancel', 'finish', 'remove'], syncPause)

  useEventListener(animate, 'finish', () => {
    if (commitStyles)
      animate.value?.commitStyles()
  })

  const { resume: resumeRef, pause: pauseRef } = useRafFn(() => {
    if (!animate.value)
      return
    store.pending = animate.value.pending
    store.playState = animate.value.playState
    store.replaceState = animate.value.replaceState
    store.startTime = animate.value.startTime
    store.currentTime = animate.value.currentTime
    store.timeline = animate.value.timeline
    store.playbackRate = animate.value.playbackRate
  }, { immediate: false })

  function syncResume() {
    if (isSupported.value)
      resumeRef()
  }

  function syncPause() {
    if (isSupported.value && window)
      window.requestAnimationFrame(pauseRef)
  }

  return {
    isSupported,
    animate,

    // actions
    play,
    pause,
    reverse,
    finish,
    cancel,

    // state
    pending,
    playState,
    replaceState,
    startTime,
    currentTime,
    timeline,
    playbackRate,
  }
}
