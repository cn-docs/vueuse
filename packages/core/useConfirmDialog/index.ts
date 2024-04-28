import type { ComputedRef, Ref } from 'vue-demi'
import { computed, ref } from 'vue-demi'
import type { EventHook, EventHookOn } from '@vueuse/shared'
import { createEventHook, noop } from '@vueuse/shared'

export type UseConfirmDialogRevealResult<C, D>
  = {
    data?: C
    isCanceled: false
  } | {
    data?: D
    isCanceled: true
  }

export interface UseConfirmDialogReturn<RevealData, ConfirmData, CancelData> {
  /**
   * 显示状态的计算属性
   */
  isRevealed: ComputedRef<boolean>

  /**
   * 打开对话框。
   * 创建一个 Promise 并返回它。触发 `onReveal` 钩子。
   */
  reveal: (data?: RevealData) => Promise<UseConfirmDialogRevealResult<ConfirmData, CancelData>>

  /**
   * 确认并关闭对话框。触发 `onConfirm` 钩子中的回调。
   * 用 `data` 解决来自 `reveal()` 的 promise，并使用 `false` 值设置 `isCanceled` ref。
   * 可以接受任何数据并将其传递给 `onConfirm` 钩子。
   */
  confirm: (data?: ConfirmData) => void

  /**
   * 取消并关闭对话框。触发 `onCancel` 钩子中的回调。
   * 用 `data` 解决来自 `reveal()` 的 promise，并使用 `true` 值设置 `isCanceled` ref。
   * 可以接受任何数据并将其传递给 `onCancel` 钩子。
   */
  cancel: (data?: CancelData) => void

  /**
   * 在创建对话框之前触发的事件钩子。
   */
  onReveal: EventHookOn<RevealData>

  /**
   * 在 `confirm()` 上调用的事件钩子。
   * 从 `confirm` 函数获取数据对象。
   */
  onConfirm: EventHookOn<ConfirmData>

  /**
   * 在 `cancel()` 上调用的事件钩子。
   * 从 `cancel` 函数获取数据对象。
   */
  onCancel: EventHookOn<CancelData>
}

/**
 * 用于创建确认对话框的钩子。对于模式窗口、弹出窗口和登录很有用。
 *
 * @see https://vueuse.org/useConfirmDialog/
 * @param revealed `boolean` `ref` that handles a modal window
 */
export function useConfirmDialog<
  RevealData = any,
  ConfirmData = any,
  CancelData = any,
>(
  revealed: Ref<boolean> = ref(false),
): UseConfirmDialogReturn<RevealData, ConfirmData, CancelData> {
  const confirmHook: EventHook = createEventHook<ConfirmData>()
  const cancelHook: EventHook = createEventHook<CancelData>()
  const revealHook: EventHook = createEventHook<RevealData>()

  let _resolve: (arg0: UseConfirmDialogRevealResult<ConfirmData, CancelData>) => void = noop

  const reveal = (data?: RevealData) => {
    revealHook.trigger(data)
    revealed.value = true

    return new Promise<UseConfirmDialogRevealResult<ConfirmData, CancelData>>((resolve) => {
      _resolve = resolve
    })
  }

  const confirm = (data?: ConfirmData) => {
    revealed.value = false
    confirmHook.trigger(data)

    _resolve({ data, isCanceled: false })
  }

  const cancel = (data?: CancelData) => {
    revealed.value = false
    cancelHook.trigger(data)
    _resolve({ data, isCanceled: true })
  }

  return {
    isRevealed: computed(() => revealed.value),
    reveal,
    confirm,
    cancel,
    onReveal: revealHook.on,
    onConfirm: confirmHook.on,
    onCancel: cancelHook.on,
  }
}
