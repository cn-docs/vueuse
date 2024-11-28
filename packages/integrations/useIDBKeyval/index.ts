import type { ConfigurableFlush, MaybeRefOrGetter, RemovableRef } from '@vueuse/shared'
import type { Ref } from 'vue'
import { watchPausable } from '@vueuse/core'
import { toValue } from '@vueuse/shared'
import { del, get, set, update } from 'idb-keyval'
import { ref, shallowRef, toRaw } from 'vue'

export interface UseIDBOptions extends ConfigurableFlush {
  /**
   * 监听深层变化
   *
   * @default true
   */
  deep?: boolean

  /**
   * 错误回调函数
   *
   * 默认将错误记录到 `console.error`
   */
  onError?: (error: unknown) => void

  /**
   * 使用浅层 Ref 作为参考
   *
   * @default false
   */
  shallow?: boolean
  /**
   * 当存储中不存在时，将默认值写入存储
   *
   * @default true
   */
  writeDefaults?: boolean
}

export interface UseIDBKeyvalReturn<T> {
  data: RemovableRef<T>
  isFinished: Ref<boolean>
  set: (value: T) => Promise<void>
}

/**
 *
 * @param key
 * @param initialValue
 * @param options
 */
export function useIDBKeyval<T>(
  key: IDBValidKey,
  initialValue: MaybeRefOrGetter<T>,
  options: UseIDBOptions = {},
): UseIDBKeyvalReturn<T> {
  const {
    flush = 'pre',
    deep = true,
    shallow = false,
    onError = (e) => {
      console.error(e)
    },
    writeDefaults = true,
  } = options

  const isFinished = ref(false)
  const data = (shallow ? shallowRef : ref)(initialValue) as Ref<T>

  const rawInit: T = toValue(initialValue)

  async function read() {
    try {
      const rawValue = await get<T>(key)
      if (rawValue === undefined) {
        if (rawInit !== undefined && rawInit !== null && writeDefaults)
          await set(key, rawInit)
      }
      else {
        data.value = rawValue
      }
    }
    catch (e) {
      onError(e)
    }
    isFinished.value = true
  }

  read()

  async function write() {
    try {
      if (data.value == null) {
        await del(key)
      }
      else {
        // IndexedDB does not support saving proxies, convert from proxy before saving
        await update(key, () => toRaw(data.value))
      }
    }
    catch (e) {
      onError(e)
    }
  }

  const {
    pause: pauseWatch,
    resume: resumeWatch,
  } = watchPausable(data, () => write(), { flush, deep })

  async function setData(value: T): Promise<void> {
    pauseWatch()
    data.value = value
    await write()
    resumeWatch()
  }

  return {
    set: setData,
    isFinished,
    data: data as RemovableRef<T>,
  }
}
