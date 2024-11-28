// ported from https://www.reddit.com/r/vuejs/comments/jksizl/speech_recognition_as_a_vue_3_hook
// by https://github.com/wobsoriano

import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { Ref } from 'vue'
import { toRef, toValue, tryOnScopeDispose } from '@vueuse/shared'
import { ref, shallowRef, watch } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'
import { useSupported } from '../useSupported'
import type { SpeechRecognition, SpeechRecognitionErrorEvent } from './types'

export interface UseSpeechRecognitionOptions extends ConfigurableWindow {
  /**
   * 控制是否对每次识别返回连续的结果，还是仅返回单个结果。
   *
   * @default true
   */
  continuous?: boolean
  /**
   * 控制是否返回临时结果（true）或不返回临时结果（false）。
   * 临时结果是尚未最终确定的结果。
   *
   * @default true
   */
  interimResults?: boolean
  /**
   * 语音识别的语言
   *
   * @default 'en-US'
   */
  lang?: MaybeRefOrGetter<string>
  /**
   * A number representing the maximum returned alternatives for each result.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/maxAlternatives
   * @default 1
   */
  maxAlternatives?: number
}

/**
 * 响应式语音识别。
 *
 * @see https://vueuse.org/useSpeechRecognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition SpeechRecognition
 * @param options
 */
export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const {
    interimResults = true,
    continuous = true,
    maxAlternatives = 1,
    window = defaultWindow,
  } = options

  const lang = toRef(options.lang || 'en-US')
  const isListening = ref(false)
  const isFinal = ref(false)
  const result = ref('')
  const error = shallowRef(undefined) as Ref<SpeechRecognitionErrorEvent | undefined>

  const toggle = (value = !isListening.value) => {
    isListening.value = value
  }

  const start = () => {
    isListening.value = true
  }

  const stop = () => {
    isListening.value = false
  }

  const SpeechRecognition = window && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
  const isSupported = useSupported(() => SpeechRecognition)

  let recognition: SpeechRecognition | undefined

  if (isSupported.value) {
    recognition = new SpeechRecognition() as SpeechRecognition

    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = toValue(lang)
    recognition.maxAlternatives = maxAlternatives

    recognition.onstart = () => {
      isFinal.value = false
    }

    watch(lang, (lang) => {
      if (recognition && !isListening.value)
        recognition.lang = lang
    })

    recognition.onresult = (event) => {
      const currentResult = event.results[event.resultIndex]
      const { transcript } = currentResult[0]

      isFinal.value = currentResult.isFinal
      result.value = transcript
      error.value = undefined
    }

    recognition.onerror = (event) => {
      error.value = event
    }

    recognition.onend = () => {
      isListening.value = false
      recognition!.lang = toValue(lang)
    }

    watch(isListening, () => {
      if (isListening.value)
        recognition!.start()
      else
        recognition!.stop()
    })
  }

  tryOnScopeDispose(() => {
    isListening.value = false
  })

  return {
    isSupported,
    isListening,
    isFinal,
    recognition,
    result,
    error,

    toggle,
    start,
    stop,
  }
}

export type UseSpeechRecognitionReturn = ReturnType<typeof useSpeechRecognition>
