import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'

import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'

import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from '../_configurable'

export interface NavigatorLanguageState {
  isSupported: Ref<boolean>
  /**
   * ISO 639-1 标准语言代码
   *
   * @info 检测到的用户代理语言偏好作为语言标签
   * （有时称为“区域设置标识符”）。
   * 这由一个表示语言的2-3个字母的基本语言标签组成，
   * 可选地后跟由“-”分隔的其他子标签。
   * 最常见的额外信息是国家或地区变体（如 'en-US' 或 'fr-CA'）。
   *
   * @see https://www.iso.org/iso-639-language-codes.html
   * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
   *
   */
  language: Ref<string | undefined>
}

/**
 *
 * Reactive useNavigatorLanguage
 *
 * Detects the currently selected user language and returns a reactive language
 * @see https://vueuse.org/useNavigatorLanguage
 *
 */
export function useNavigatorLanguage(options: ConfigurableWindow = {}): Readonly<NavigatorLanguageState> {
  const { window = defaultWindow } = options

  const navigator = window?.navigator

  const isSupported = useSupported(() => navigator && 'language' in navigator)

  const language = ref<string | undefined>(navigator?.language)

  // Listen to when to user changes language:
  useEventListener(window, 'languagechange', () => {
    if (navigator)
      language.value = navigator.language
  })

  return {
    isSupported,
    language,
  }
}

export type UseNavigatorLanguageReturn = ReturnType<typeof useNavigatorLanguage>
