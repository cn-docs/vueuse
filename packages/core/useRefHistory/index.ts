import type { ConfigurableEventFilter, Fn } from '@vueuse/shared'
import type { Ref } from 'vue'
import { pausableFilter, watchIgnorable } from '@vueuse/shared'
import type { CloneFn } from '../useCloned'
import type { UseManualRefHistoryReturn } from '../useManualRefHistory'
import { useManualRefHistory } from '../useManualRefHistory'

export interface UseRefHistoryOptions<Raw, Serialized = Raw> extends ConfigurableEventFilter {
  /**
   * 监听深层变化，默认为 false
   *
   * 当设置为 true 时，它还将为存储在历史记录中的值创建克隆
   *
   * @default false
   */
  deep?: boolean

  /**
   * flush 选项允许更大的控制历史点的时间，默认为 'pre'
   *
   * 可能的值：'pre', 'post', 'sync'
   * 它的工作方式与 vue 响应性中 watch 和 watch effect 中的 flush 选项相同
   *
   * @default 'pre'
   */
  flush?: 'pre' | 'post' | 'sync'

  /**
   * 要保留的历史记录的最大数量。默认为无限。
   */
  capacity?: number

  /**
   * 在获取快照时进行克隆，快捷方式为 dump: JSON.parse(JSON.stringify(value))。
   * 默认为 false
   *
   * @default false
   */
  clone?: boolean | CloneFn<Raw>
  /**
   * 将数据序列化到历史记录中
   */
  dump?: (v: Raw) => Serialized
  /**
   * 从历史记录中反序列化数据
   */
  parse?: (v: Serialized) => Raw
}

export interface UseRefHistoryReturn<Raw, Serialized> extends UseManualRefHistoryReturn<Raw, Serialized> {
  /**
   * 表示是否启用跟踪的 ref
   */
  isTracking: Ref<boolean>

  /**
   * 暂停更改跟踪
   */
  pause: () => void

  /**
   * 恢复更改跟踪
   *
   * @param [commit] 如果为 true，在恢复后将创建一个历史记录
   */
  resume: (commit?: boolean) => void

  /**
   * 在函数范围内提供自动暂停和自动恢复的语法糖
   *
   * @param fn
   */
  batch: (fn: (cancel: Fn) => void) => void

  /**
   * 清除数据并停止观察
   */
  dispose: () => void
}

/**
 * 跟踪 ref 的变更历史记录，并提供撤销和重做功能。
 *
 * @see https://vueuse.org/useRefHistory
 * @param source
 * @param options
 */
export function useRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options: UseRefHistoryOptions<Raw, Serialized> = {},
): UseRefHistoryReturn<Raw, Serialized> {
  const {
    deep = false,
    flush = 'pre',
    eventFilter,
  } = options

  const {
    eventFilter: composedFilter,
    pause,
    resume: resumeTracking,
    isActive: isTracking,
  } = pausableFilter(eventFilter)

  const {
    ignoreUpdates,
    ignorePrevAsyncUpdates,
    stop,
  } = watchIgnorable(
    source,
    commit,
    { deep, flush, eventFilter: composedFilter },
  )

  function setSource(source: Ref<Raw>, value: Raw) {
    // Support changes that are done after the last history operation
    // examples:
    //   undo, modify
    //   undo, undo, modify
    // If there were already changes in the state, they will be ignored
    // examples:
    //   modify, undo
    //   undo, modify, undo
    ignorePrevAsyncUpdates()

    ignoreUpdates(() => {
      source.value = value
    })
  }

  const manualHistory = useManualRefHistory(source, { ...options, clone: options.clone || deep, setSource })

  const { clear, commit: manualCommit } = manualHistory

  function commit() {
    // This guard only applies for flush 'pre' and 'post'
    // If the user triggers a commit manually, then reset the watcher
    // so we do not trigger an extra commit in the async watcher
    ignorePrevAsyncUpdates()

    manualCommit()
  }

  function resume(commitNow?: boolean) {
    resumeTracking()
    if (commitNow)
      commit()
  }

  function batch(fn: (cancel: Fn) => void) {
    let canceled = false

    const cancel = () => canceled = true

    ignoreUpdates(() => {
      fn(cancel)
    })

    if (!canceled)
      commit()
  }

  function dispose() {
    stop()
    clear()
  }
  return {
    ...manualHistory,
    isTracking,
    pause,
    resume,
    commit,
    batch,
    dispose,
  }
}
