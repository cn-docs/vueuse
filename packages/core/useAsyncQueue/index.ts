import { noop } from '@vueuse/shared'
import type { Ref } from 'vue-demi'
import { reactive, ref } from 'vue-demi'

export type UseAsyncQueueTask<T> = (...args: any[]) => T | Promise<T>

type MapQueueTask<T extends any[]> = {
  [K in keyof T]: UseAsyncQueueTask<T[K]>
}
export interface UseAsyncQueueResult<T> {
  state: 'aborted' | 'fulfilled' | 'pending' | 'rejected'
  data: T | null
}

export interface UseAsyncQueueReturn<T> {
  activeIndex: Ref<number>
  result: T
}

export interface UseAsyncQueueOptions {
  /**
   * 当当前任务失败时，是否中断任务队列。
   *
   * @default true
   */
  interrupt?: boolean

  /**
   * 当任务失败时触发。
   *
   */
  onError?: () => void

  /**
   * 当任务结束时触发。
   *
   */
  onFinished?: () => void

  /**
   * 可用于中止任务的 AbortSignal。
   */
  signal?: AbortSignal
}

/**
 * 异步任务队列控制器
 *
 * @see https://vueuse.org/useAsyncQueue
 * @param tasks
 * @param options
 */
export function useAsyncQueue<T extends any[], S = MapQueueTask<T>>(
  tasks: S & Array<UseAsyncQueueTask<any>>,
  options?: UseAsyncQueueOptions,
): UseAsyncQueueReturn<{ [P in keyof T]: UseAsyncQueueResult<T[P]> }> {
  const {
    interrupt = true,
    onError = noop,
    onFinished = noop,
    signal,
  } = options || {}

  const promiseState: Record<
    UseAsyncQueueResult<T>['state'],
    UseAsyncQueueResult<T>['state']
  > = {
    aborted: 'aborted',
    fulfilled: 'fulfilled',
    pending: 'pending',
    rejected: 'rejected',
  }

  const initialResult = Array.from(Array.from({ length: tasks.length }), () => ({ state: promiseState.pending, data: null }))

  const result = reactive(initialResult) as { [P in keyof T]: UseAsyncQueueResult<T[P]> }

  const activeIndex = ref<number>(-1)

  if (!tasks || tasks.length === 0) {
    onFinished()
    return {
      activeIndex,
      result,
    }
  }

  function updateResult(state: UseAsyncQueueResult<T>['state'], res: unknown) {
    activeIndex.value++
    result[activeIndex.value].data = res as T
    result[activeIndex.value].state = state
  }

  tasks.reduce((prev, curr) => {
    return prev
      .then((prevRes) => {
        if (signal?.aborted) {
          updateResult(promiseState.aborted, new Error('aborted'))
          return
        }

        if (
          result[activeIndex.value]?.state === promiseState.rejected
          && interrupt
        ) {
          onFinished()
          return
        }

        const done = curr(prevRes).then((currentRes: any) => {
          updateResult(promiseState.fulfilled, currentRes)
          if (activeIndex.value === tasks.length - 1)
            onFinished()
          return currentRes
        })

        if (!signal)
          return done

        return Promise.race([done, whenAborted(signal)])
      })
      .catch((e) => {
        if (signal?.aborted) {
          updateResult(promiseState.aborted, e)
          return e
        }

        updateResult(promiseState.rejected, e)
        onError()
        return e
      })
  }, Promise.resolve())

  return {
    activeIndex,
    result,
  }
}

function whenAborted(signal: AbortSignal): Promise<never> {
  return new Promise((resolve, reject) => {
    const error = new Error('aborted')

    if (signal.aborted)
      reject(error)
    else
      signal.addEventListener('abort', () => reject(error), { once: true })
  })
}
