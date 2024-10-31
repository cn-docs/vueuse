import type { EventHook } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import type { ConfigurableWindow } from '../_configurable'
import { createEventHook, tryOnMounted, tryOnScopeDispose } from '@vueuse/shared'
import { ref } from 'vue-demi'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'

export interface WebNotificationOptions {
  /**
   * Notification 的标题，只读属性，指示通知的标题。
   *
   * @default ''
   */
  title?: string
  /**
   * Notification 的正文字符串，指定在构造函数的 options 参数中。
   *
   * @default ''
   */
  body?: string
  /**
   * Notification 的文本方向，指定在构造函数的 options 参数中。
   *
   * @default ''
   */
  dir?: 'auto' | 'ltr' | 'rtl'
  /**
   * Notification 的语言代码，指定在构造函数的 options 参数中。
   *
   * @default DOMString
   */
  lang?: string
  /**
   * Notification 的 ID（如果有），指定在构造函数的 options 参数中。
   *
   * @default ''
   */
  tag?: string
  /**
   * 作为通知图标使用的图像的 URL，指定在构造函数的 options 参数中。
   *
   * @default ''
   */
  icon?: string
  /**
   * 指定是否在新通知替换旧通知后应通知用户。
   *
   * @default false
   */
  renotify?: boolean
  /**
   * 一个布尔值，指示通知是否应该保持活动状态，直到用户点击或解除通知，而不是自动关闭。
   *
   * @default false
   */
  requireInteraction?: boolean
  /**
   * Notification 的 silent 只读属性指定通知是否应该是静音的，即，无论设备设置如何，都不应发出声音或振动。
   *
   * @default false
   */
  silent?: boolean
  /**
   * 为具有振动硬件的设备指定振动模式以发出的震动模式。
   * 一个振动模式，如 Vibration API 规范中所指定的那样。
   *
   * @see https://w3c.github.io/vibration/
   */
  vibrate?: number[]
}

export interface UseWebNotificationOptions extends ConfigurableWindow, WebNotificationOptions {
  /**
   * 如果权限未授予，则在 onMounted 时请求权限。
   *
   * 可以禁用，并在之后调用 `ensurePermissions` 以授予权限。
   *
   * @default true
   */
  requestPermissions?: boolean
}

/**
 * 用于响应式地使用 Web 通知
 *
 * @see https://vueuse.org/useWebNotification
 * @see https://developer.mozilla.org/en-US/docs/Web/API/notification
 */
export function useWebNotification(
  options: UseWebNotificationOptions = {},
) {
  const {
    window = defaultWindow,
    requestPermissions: _requestForPermissions = true,
  } = options

  const defaultWebNotificationOptions: WebNotificationOptions = options

  const isSupported = useSupported(() => {
    if (!window || !('Notification' in window))
      return false
    // https://stackoverflow.com/questions/29774836/failed-to-construct-notification-illegal-constructor/29895431
    // https://issues.chromium.org/issues/40415865
    try {
      // eslint-disable-next-line no-new
      new Notification('')
    }
    catch {
      return false
    }
    return true
  })

  const permissionGranted = ref(isSupported.value && 'permission' in Notification && Notification.permission === 'granted')

  const notification: Ref<Notification | null> = ref(null)

  const ensurePermissions = async () => {
    if (!isSupported.value)
      return

    if (!permissionGranted.value && Notification.permission !== 'denied') {
      const result = await Notification.requestPermission()
      if (result === 'granted')
        permissionGranted.value = true
    }

    return permissionGranted.value
  }

  const { on: onClick, trigger: clickTrigger }: EventHook = createEventHook<Event>()
  const { on: onShow, trigger: showTrigger }: EventHook = createEventHook<Event>()
  const { on: onError, trigger: errorTrigger }: EventHook = createEventHook<Event>()
  const { on: onClose, trigger: closeTrigger }: EventHook = createEventHook<Event>()

  // Show notification method:
  const show = async (overrides?: WebNotificationOptions) => {
    // If either the browser does not support notifications or the user has
    // not granted permission, do nothing:
    if (!isSupported.value || !permissionGranted.value)
      return

    const options = Object.assign({}, defaultWebNotificationOptions, overrides)

    notification.value = new Notification(options.title || '', options)

    notification.value.onclick = clickTrigger
    notification.value.onshow = showTrigger
    notification.value.onerror = errorTrigger
    notification.value.onclose = closeTrigger

    return notification.value
  }

  // Close notification method:
  const close = (): void => {
    if (notification.value)
      notification.value.close()
    notification.value = null
  }

  // On mount, attempt to request permission:
  if (_requestForPermissions)
    tryOnMounted(ensurePermissions)

  // Attempt cleanup of the notification:
  tryOnScopeDispose(close)

  // Use close() to remove a notification that is no longer relevant to to
  // the user (e.g.the user already read the notification on the webpage).
  // Most modern browsers dismiss notifications automatically after a few
  // moments(around four seconds).
  if (isSupported.value && window) {
    const document = window.document
    useEventListener(document, 'visibilitychange', (e: Event) => {
      e.preventDefault()
      if (document.visibilityState === 'visible') {
        // The tab has become visible so clear the now-stale Notification:
        close()
      }
    })
  }

  return {
    isSupported,
    notification,
    ensurePermissions,
    permissionGranted,
    show,
    close,
    onClick,
    onShow,
    onError,
    onClose,
  }
}

export type UseWebNotificationReturn = ReturnType<typeof useWebNotification>
