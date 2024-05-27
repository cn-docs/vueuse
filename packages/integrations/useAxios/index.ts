import type { Ref, ShallowRef } from 'vue-demi'
import { ref, shallowRef } from 'vue-demi'
import { noop, until } from '@vueuse/shared'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'

export interface UseAxiosReturn<T, R = AxiosResponse<T>, _D = any> {
  /**
   * Axios 响应
   */
  response: ShallowRef<R | undefined>

  /**
   * Axios 响应数据
   */
  data: Ref<T | undefined>

  /**
   * 表示请求是否已完成
   */
  isFinished: Ref<boolean>

  /**
   * 表示请求是否当前正在加载
   */
  isLoading: Ref<boolean>

  /**
   * 表示请求是否已被取消
   */
  isAborted: Ref<boolean>

  /**
   * 可能发生的任何错误
   */
  error: ShallowRef<unknown | undefined>

  /**
   * 中止当前请求
   */
  abort: (message?: string | undefined) => void

  /**
   * `abort` 的别名
   */
  cancel: (message?: string | undefined) => void

  /**
   * `isAborted` 的别名
   */
  isCanceled: Ref<boolean>
}
export interface StrictUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R, D> {
  /**
   * 手动调用 axios 请求
   */
  execute: (url?: string | AxiosRequestConfig<D>, config?: AxiosRequestConfig<D>) => Promise<StrictUseAxiosReturn<T, R, D>>
}
export interface EasyUseAxiosReturn<T, R, D> extends UseAxiosReturn<T, R, D> {
  /**
   * 手动调用 axios 请求
   */
  execute: (url: string, config?: AxiosRequestConfig<D>) => Promise<EasyUseAxiosReturn<T, R, D>>
}
export interface UseAxiosOptions<T = any> {
  /**
   * 当使用 `useAxios` 时，是否自动运行 axios 请求
   */
  immediate?: boolean

  /**
   * 使用 shallowRef。
   *
   * @default true
   */
  shallow?: boolean

  /**
   * 当发起新请求时，中止前一个请求。
   *
   * @default true
   */
  abortPrevious?: boolean

  /**
   * 在捕获错误时的回调。
   */
  onError?: (e: unknown) => void

  /**
   * 在捕获成功时的回调。
   */
  onSuccess?: (data: T) => void

  /**
   * 初始数据
   */
  initialData?: T

  /**
   * 在执行 Promise 之前将状态设置为 initialState。
   */
  resetOnExecute?: boolean

  /**
   * 请求完成时的回调。
   */
  onFinish?: () => void
}
type OverallUseAxiosReturn<T, R, D> = StrictUseAxiosReturn<T, R, D> | EasyUseAxiosReturn<T, R, D>

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & Promise<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, instance?: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & Promise<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(url: string, config: AxiosRequestConfig<D>, instance: AxiosInstance, options?: UseAxiosOptions): StrictUseAxiosReturn<T, R, D> & Promise<StrictUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(config?: AxiosRequestConfig<D>): EasyUseAxiosReturn<T, R, D> & Promise<EasyUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(instance?: AxiosInstance): EasyUseAxiosReturn<T, R, D> & Promise<EasyUseAxiosReturn<T, R, D>>
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(config?: AxiosRequestConfig<D>, instance?: AxiosInstance): EasyUseAxiosReturn<T, R, D> & Promise<EasyUseAxiosReturn<T, R, D>>

/**
 * axios 的封装器。
 *
 * @see https://vueuse.org/useAxios
 */
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(...args: any[]): OverallUseAxiosReturn<T, R, D> & Promise<OverallUseAxiosReturn<T, R, D>> {
  const url: string | undefined = typeof args[0] === 'string' ? args[0] : undefined
  const argsPlaceholder = typeof url === 'string' ? 1 : 0
  const defaultOptions: UseAxiosOptions<T> = {
    immediate: !!argsPlaceholder,
    shallow: true,
    abortPrevious: true,
  }
  let defaultConfig: AxiosRequestConfig<D> = {}
  let instance: AxiosInstance = axios
  let options: UseAxiosOptions<T> = defaultOptions

  const isAxiosInstance = (val: any) => !!val?.request

  if (args.length > 0 + argsPlaceholder) {
    /**
     * Unable to use `instanceof` here because of (https://github.com/axios/axios/issues/737)
     * so instead we are checking if there is a `request` on the object to see if it is an
     * axios instance
     */
    if (isAxiosInstance(args[0 + argsPlaceholder]))
      instance = args[0 + argsPlaceholder]
    else
      defaultConfig = args[0 + argsPlaceholder]
  }

  if (args.length > 1 + argsPlaceholder) {
    if (isAxiosInstance(args[1 + argsPlaceholder]))
      instance = args[1 + argsPlaceholder]
  }
  if (
    (args.length === 2 + argsPlaceholder && !isAxiosInstance(args[1 + argsPlaceholder]))
    || args.length === 3 + argsPlaceholder
  )
    options = args[args.length - 1] || defaultOptions

  const {
    initialData,
    shallow,
    onSuccess = noop,
    onError = noop,
    immediate,
    resetOnExecute = false,
  } = options

  const response = shallowRef<AxiosResponse<T>>()
  const data = (shallow ? shallowRef : ref)<T>(initialData!) as Ref<T>
  const isFinished = ref(false)
  const isLoading = ref(false)
  const isAborted = ref(false)
  const error = shallowRef<unknown>()

  let abortController: AbortController = new AbortController()

  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value)
      return

    abortController.abort(message)
    abortController = new AbortController()
    isAborted.value = true
    isLoading.value = false
    isFinished.value = false
  }

  const loading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }

  /**
   * Reset data to initialData
   */
  const resetData = () => {
    if (resetOnExecute)
      data.value = initialData!
  }

  const waitUntilFinished = () =>
    new Promise<OverallUseAxiosReturn<T, R, D>>((resolve, reject) => {
      until(isFinished).toBe(true)
        // eslint-disable-next-line ts/no-use-before-define
        .then(() => error.value ? reject(error.value) : resolve(result))
    })

  const promise = {
    then: (...args) => waitUntilFinished().then(...args),
    catch: (...args) => waitUntilFinished().catch(...args),
  } as Promise<OverallUseAxiosReturn<T, R, D>>

  let executeCounter = 0
  const execute: OverallUseAxiosReturn<T, R, D>['execute'] = (executeUrl: string | AxiosRequestConfig<D> | undefined = url, config: AxiosRequestConfig<D> = {}) => {
    error.value = undefined
    const _url = typeof executeUrl === 'string'
      ? executeUrl
      : url ?? config.url

    if (_url === undefined) {
      error.value = new AxiosError(AxiosError.ERR_INVALID_URL)
      isFinished.value = true
      return promise
    }
    resetData()

    if (options.abortPrevious !== false)
      abort()

    loading(true)

    executeCounter += 1
    const currentExecuteCounter = executeCounter
    isAborted.value = false

    instance(_url, { ...defaultConfig, ...typeof executeUrl === 'object' ? executeUrl : config, signal: abortController.signal })
      .then((r: any) => {
        if (isAborted.value)
          return
        response.value = r
        const result = r.data
        data.value = result
        onSuccess(result)
      })
      .catch((e: any) => {
        error.value = e
        onError(e)
      })
      .finally(() => {
        options.onFinish?.()
        if (currentExecuteCounter === executeCounter)
          loading(false)
      })
    return promise
  }

  if (immediate && url)
    (execute as StrictUseAxiosReturn<T, R, D>['execute'])()

  const result = {
    response,
    data,
    error,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    isCanceled: isAborted,
    abort,
    execute,
  } as OverallUseAxiosReturn<T, R, D>

  return {
    ...result,
    ...promise,
  }
}
