import { timestamp } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { computed, markRaw, ref } from 'vue-demi'
import type { CloneFn } from '../useCloned'
import { cloneFnJSON } from '../useCloned'

export interface UseRefHistoryRecord<T> {
  snapshot: T
  timestamp: number
}

export interface UseManualRefHistoryOptions<Raw, Serialized = Raw> {
  /**
   * 保留的历史记录的最大数量。默认为无限制。
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

  /**
   * 设置数据源
   */
  setSource?: (source: Ref<Raw>, v: Raw) => void
}

export interface UseManualRefHistoryReturn<Raw, Serialized> {
  /**
   * 绕过跟踪的原始 ref
   */
  source: Ref<Raw>

  /**
   * 用于撤销的历史记录数组，最新的记录在最前面
   */
  history: Ref<UseRefHistoryRecord<Serialized>[]>

  /**
   * 最后的历史记录点，如果暂停，则源可能不同
   */
  last: Ref<UseRefHistoryRecord<Serialized>>

  /**
   * 与 {@link UseManualRefHistoryReturn.history | history} 相同
   */
  undoStack: Ref<UseRefHistoryRecord<Serialized>[]>

  /**
   * 用于重做的记录数组
   */
  redoStack: Ref<UseRefHistoryRecord<Serialized>[]>

  /**
   * 表示是否可以撤销的 ref（undoStack 不为空）
   */
  canUndo: Ref<boolean>

  /**
   * 表示是否可以重做的 ref（redoStack 不为空）
   */
  canRedo: Ref<boolean>

  /**
   * 撤销更改
   */
  undo: () => void

  /**
   * 重做更改
   */
  redo: () => void

  /**
   * 清除所有历史记录
   */
  clear: () => void

  /**
   * 创建新的历史记录
   */
  commit: () => void

  /**
   * 使用最新历史记录重置 ref 的值
   */
  reset: () => void
}

function fnBypass<F, T>(v: F) {
  return v as unknown as T
}
function fnSetSource<F>(source: Ref<F>, value: F) {
  return source.value = value
}

type FnCloneOrBypass<F, T> = (v: F) => T

function defaultDump<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone
    ? typeof clone === 'function'
      ? clone
      : cloneFnJSON
    : fnBypass
  ) as unknown as FnCloneOrBypass<R, S>
}

function defaultParse<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone
    ? typeof clone === 'function'
      ? clone
      : cloneFnJSON
    : fnBypass
  ) as unknown as FnCloneOrBypass<S, R>
}

/**
 * Track the change history of a ref, also provides undo and redo functionality.
 *
 * @see https://vueuse.org/useManualRefHistory
 * @param source
 * @param options
 */
export function useManualRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options: UseManualRefHistoryOptions<Raw, Serialized> = {},
): UseManualRefHistoryReturn<Raw, Serialized> {
  const {
    clone = false,
    dump = defaultDump<Raw, Serialized>(clone),
    parse = defaultParse<Raw, Serialized>(clone),
    setSource = fnSetSource,
  } = options

  function _createHistoryRecord(): UseRefHistoryRecord<Serialized> {
    return markRaw({
      snapshot: dump(source.value),
      timestamp: timestamp(),
    })
  }

  const last: Ref<UseRefHistoryRecord<Serialized>> = ref(_createHistoryRecord()) as Ref<UseRefHistoryRecord<Serialized>>

  const undoStack: Ref<UseRefHistoryRecord<Serialized>[]> = ref([])
  const redoStack: Ref<UseRefHistoryRecord<Serialized>[]> = ref([])

  const _setSource = (record: UseRefHistoryRecord<Serialized>) => {
    setSource(source, parse(record.snapshot))
    last.value = record
  }

  const commit = () => {
    undoStack.value.unshift(last.value)
    last.value = _createHistoryRecord()

    if (options.capacity && undoStack.value.length > options.capacity)
      undoStack.value.splice(options.capacity, Number.POSITIVE_INFINITY)
    if (redoStack.value.length)
      redoStack.value.splice(0, redoStack.value.length)
  }

  const clear = () => {
    undoStack.value.splice(0, undoStack.value.length)
    redoStack.value.splice(0, redoStack.value.length)
  }

  const undo = () => {
    const state = undoStack.value.shift()

    if (state) {
      redoStack.value.unshift(last.value)
      _setSource(state)
    }
  }

  const redo = () => {
    const state = redoStack.value.shift()

    if (state) {
      undoStack.value.unshift(last.value)
      _setSource(state)
    }
  }

  const reset = () => {
    _setSource(last.value)
  }

  const history = computed(() => [last.value, ...undoStack.value])

  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)

  return {
    source,
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,

    clear,
    commit,
    reset,
    undo,
    redo,
  }
}
