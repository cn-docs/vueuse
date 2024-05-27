import type { EventHookOn, Fn, MaybeRefOrGetter, Stoppable } from '@vueuse/shared'
import { containsProp, createEventHook, toRef, toValue, until, useTimeoutFn } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue-demi'
import { computed, isRef, readonly, ref, shallowRef, watch } from 'vue-demi'
import { defaultWindow } from '../_configurable'

export interface UseFetchReturn<T> {
  /**
   * 表示 fetch 请求是否已完成
   */
  isFinished: Readonly<Ref<boolean>>

  /**
   * HTTP fetch 响应的 statusCode
   */
  statusCode: Ref<number | null>

  /**
   * fetch 响应的原始数据
   */
  response: Ref<Response | null>

  /**
   * 可能发生的任何 fetch 错误
   */
  error: Ref<any>

  /**
   * 成功时的 fetch 响应体，可能是 JSON 或文本
   */
  data: Ref<T | null>

  /**
   * 表示当前是否正在进行 fetch 请求
   */
  isFetching: Readonly<Ref<boolean>>

  /**
   * 表示 fetch 请求是否可以中止
   */
  canAbort: ComputedRef<boolean>

  /**
   * 表示 fetch 请求是否已中止
   */
  aborted: Ref<boolean>

  /**
   * 中止 fetch 请求
   */
  abort: Fn

  /**
   * 手动调用 fetch
   * （默认不抛出错误）
   */
  execute: (throwOnFailed?: boolean) => Promise<any>

  /**
   * 在 fetch 请求完成后触发
   */
  onFetchResponse: EventHookOn<Response>

  /**
   * 在 fetch 请求错误后触发
   */
  onFetchError: EventHookOn

  /**
   * 在 fetch 完成后触发
   */
  onFetchFinally: EventHookOn

  // methods
  get: () => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  post: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  put: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  delete: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  patch: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  head: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  options: (payload?: MaybeRefOrGetter<unknown>, type?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>

  // type
  json: <JSON = any>() => UseFetchReturn<JSON> & PromiseLike<UseFetchReturn<JSON>>
  text: () => UseFetchReturn<string> & PromiseLike<UseFetchReturn<string>>
  blob: () => UseFetchReturn<Blob> & PromiseLike<UseFetchReturn<Blob>>
  arrayBuffer: () => UseFetchReturn<ArrayBuffer> & PromiseLike<UseFetchReturn<ArrayBuffer>>
  formData: () => UseFetchReturn<FormData> & PromiseLike<UseFetchReturn<FormData>>
}

type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
type Combination = 'overwrite' | 'chain'

const payloadMapping: Record<string, string> = {
  json: 'application/json',
  text: 'text/plain',
}

export interface BeforeFetchContext {
  /**
   * 当前请求的计算后的 URL
   */
  url: string

  /**
   * 当前请求的请求选项
   */
  options: RequestInit

  /**
   * 取消当前请求
   */
  cancel: Fn
}

export interface AfterFetchContext<T = any> {
  response: Response

  data: T | null
}

export interface OnFetchErrorContext<T = any, E = any> {
  error: E

  data: T | null
}

export interface UseFetchOptions {
  /**
   * Fetch 函数
   */
  fetch?: typeof window.fetch

  /**
   * 当 `useFetch` 被使用时是否自动运行 fetch
   *
   * @default true
   */
  immediate?: boolean

  /**
   * 当以下情况发生时是否自动重新获取：
   * - 如果 URL 是一个 ref，则 URL 被更改
   * - 如果 payload 是一个 ref，则 payload 被更改
   *
   * @default false
   */
  refetch?: MaybeRefOrGetter<boolean>

  /**
   * 请求完成之前的初始数据
   *
   * @default null
   */
  initialData?: any

  /**
   * 在多少毫秒后中止请求
   * `0` 表示使用浏览器默认值
   *
   * @default 0
   */
  timeout?: number

  /**
   * 允许在发生 fetch 错误时更新 `data` ref，无论是在提供的回调函数中还是在 `onFetchError` 回调中改变
   *
   * @default false
   */
  updateDataOnError?: boolean

  /**
   * 在 fetch 请求被分派之前立即运行
   */
  beforeFetch?: (ctx: BeforeFetchContext) => Promise<Partial<BeforeFetchContext> | void> | Partial<BeforeFetchContext> | void

  /**
   * 在 fetch 请求返回后立即运行。
   * 在任何 2xx 响应之后运行
   */
  afterFetch?: (ctx: AfterFetchContext) => Promise<Partial<AfterFetchContext>> | Partial<AfterFetchContext>

  /**
   * 在 fetch 请求返回后立即运行。
   * 在任何 4xx 和 5xx 响应之后运行
   */
  onFetchError?: (ctx: { data: any, response: Response | null, error: any }) => Promise<Partial<OnFetchErrorContext>> | Partial<OnFetchErrorContext>
}

export interface CreateFetchOptions {
  /**
   * 除非 URL 是绝对的，否则将添加到所有 URL 前面的基础 URL
   */
  baseUrl?: MaybeRefOrGetter<string>

  /**
   * 确定 beforeFetch、afterFetch、onFetchError 的继承行为
   * @default 'chain'
   */
  combination?: Combination

  /**
   * useFetch 函数的默认选项
   */
  options?: UseFetchOptions

  /**
   * fetch 请求的选项
   */
  fetchOptions?: RequestInit
}

/**
 * !!!IMPORTANT!!!
 *
 * If you update the UseFetchOptions interface, be sure to update this object
 * to include the new options
 */
function isFetchOptions(obj: object): obj is UseFetchOptions {
  return obj && containsProp(obj, 'immediate', 'refetch', 'initialData', 'timeout', 'beforeFetch', 'afterFetch', 'onFetchError', 'fetch', 'updateDataOnError')
}

const reAbsolute = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i
// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
function isAbsoluteURL(url: string) {
  return reAbsolute.test(url)
}

function headersToObject(headers: HeadersInit | undefined) {
  if (typeof Headers !== 'undefined' && headers instanceof Headers)
    return Object.fromEntries(headers.entries())
  return headers
}

function combineCallbacks<T = any>(combination: Combination, ...callbacks: (((ctx: T) => void | Partial<T> | Promise<void | Partial<T>>) | undefined)[]) {
  if (combination === 'overwrite') {
    // use last callback
    return async (ctx: T) => {
      const callback = callbacks[callbacks.length - 1]
      if (callback)
        return { ...ctx, ...(await callback(ctx)) }

      return ctx
    }
  }
  else {
    // chaining and combine result
    return async (ctx: T) => {
      for (const callback of callbacks) {
        if (callback)
          ctx = { ...ctx, ...(await callback(ctx)) }
      }

      return ctx
    }
  }
}

export function createFetch(config: CreateFetchOptions = {}) {
  const _combination = config.combination || 'chain' as Combination
  const _options = config.options || {}
  const _fetchOptions = config.fetchOptions || {}

  function useFactoryFetch(url: MaybeRefOrGetter<string>, ...args: any[]) {
    const computedUrl = computed(() => {
      const baseUrl = toValue(config.baseUrl)
      const targetUrl = toValue(url)

      return (baseUrl && !isAbsoluteURL(targetUrl))
        ? joinPaths(baseUrl, targetUrl)
        : targetUrl
    })

    let options = _options
    let fetchOptions = _fetchOptions

    // Merge properties into a single object
    if (args.length > 0) {
      if (isFetchOptions(args[0])) {
        options = {
          ...options,
          ...args[0],
          beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[0].beforeFetch),
          afterFetch: combineCallbacks(_combination, _options.afterFetch, args[0].afterFetch),
          onFetchError: combineCallbacks(_combination, _options.onFetchError, args[0].onFetchError),
        }
      }
      else {
        fetchOptions = {
          ...fetchOptions,
          ...args[0],
          headers: {
            ...(headersToObject(fetchOptions.headers) || {}),
            ...(headersToObject(args[0].headers) || {}),
          },
        }
      }
    }

    if (args.length > 1 && isFetchOptions(args[1])) {
      options = {
        ...options,
        ...args[1],
        beforeFetch: combineCallbacks(_combination, _options.beforeFetch, args[1].beforeFetch),
        afterFetch: combineCallbacks(_combination, _options.afterFetch, args[1].afterFetch),
        onFetchError: combineCallbacks(_combination, _options.onFetchError, args[1].onFetchError),
      }
    }

    return useFetch(computedUrl, fetchOptions, options)
  }

  return useFactoryFetch as typeof useFetch
}

export function useFetch<T>(url: MaybeRefOrGetter<string>): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useFetch<T>(url: MaybeRefOrGetter<string>, useFetchOptions: UseFetchOptions): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useFetch<T>(url: MaybeRefOrGetter<string>, options: RequestInit, useFetchOptions?: UseFetchOptions): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>

export function useFetch<T>(url: MaybeRefOrGetter<string>, ...args: any[]): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  const supportsAbort = typeof AbortController === 'function'

  let fetchOptions: RequestInit = {}
  let options: UseFetchOptions = {
    immediate: true,
    refetch: false,
    timeout: 0,
    updateDataOnError: false,
  }

  interface InternalConfig {
    method: HttpMethod
    type: DataType
    payload: unknown
    payloadType?: string
  }

  const config: InternalConfig = {
    method: 'GET',
    type: 'text' as DataType,
    payload: undefined as unknown,
  }

  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options = { ...options, ...args[0] }
    else
      fetchOptions = args[0]
  }

  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options = { ...options, ...args[1] }
  }

  const {
    fetch = defaultWindow?.fetch,
    initialData,
    timeout,
  } = options

  // Event Hooks
  const responseEvent = createEventHook<Response>()
  const errorEvent = createEventHook<any>()
  const finallyEvent = createEventHook<any>()

  const isFinished = ref(false)
  const isFetching = ref(false)
  const aborted = ref(false)
  const statusCode = ref<number | null>(null)
  const response = shallowRef<Response | null>(null)
  const error = shallowRef<any>(null)
  const data = shallowRef<T | null>(initialData || null)

  const canAbort = computed(() => supportsAbort && isFetching.value)

  let controller: AbortController | undefined
  let timer: Stoppable | undefined

  const abort = () => {
    if (supportsAbort) {
      controller?.abort()
      controller = new AbortController()
      controller.signal.onabort = () => aborted.value = true
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal,
      }
    }
  }

  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading
    isFinished.value = !isLoading
  }

  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false })

  let executeCounter = 0

  const execute = async (throwOnFailed = false) => {
    abort()

    loading(true)
    error.value = null
    statusCode.value = null
    aborted.value = false

    executeCounter += 1
    const currentExecuteCounter = executeCounter

    const defaultFetchOptions: RequestInit = {
      method: config.method,
      headers: {},
    }

    if (config.payload) {
      const headers = headersToObject(defaultFetchOptions.headers) as Record<string, string>
      const payload = toValue(config.payload)
      // Set the payload to json type only if it's not provided and a literal object is provided and the object is not `formData`
      // The only case we can deduce the content type and `fetch` can't
      if (!config.payloadType && payload && Object.getPrototypeOf(payload) === Object.prototype && !(payload instanceof FormData))
        config.payloadType = 'json'

      if (config.payloadType)
        headers['Content-Type'] = payloadMapping[config.payloadType] ?? config.payloadType

      defaultFetchOptions.body = config.payloadType === 'json'
        ? JSON.stringify(payload)
        : payload as BodyInit
    }

    let isCanceled = false
    const context: BeforeFetchContext = {
      url: toValue(url),
      options: {
        ...defaultFetchOptions,
        ...fetchOptions,
      },
      cancel: () => { isCanceled = true },
    }

    if (options.beforeFetch)
      Object.assign(context, await options.beforeFetch(context))

    if (isCanceled || !fetch) {
      loading(false)
      return Promise.resolve(null)
    }

    let responseData: any = null

    if (timer)
      timer.start()

    return fetch(
      context.url,
      {
        ...defaultFetchOptions,
        ...context.options,
        headers: {
          ...headersToObject(defaultFetchOptions.headers),
          ...headersToObject(context.options?.headers),
        },
      },
    )
      .then(async (fetchResponse) => {
        response.value = fetchResponse
        statusCode.value = fetchResponse.status

        responseData = await fetchResponse.clone()[config.type]()

        // see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!fetchResponse.ok) {
          data.value = initialData || null
          throw new Error(fetchResponse.statusText)
        }

        if (options.afterFetch) {
          ({ data: responseData } = await options.afterFetch({
            data: responseData,
            response: fetchResponse,
          }))
        }
        data.value = responseData

        responseEvent.trigger(fetchResponse)
        return fetchResponse
      })
      .catch(async (fetchError) => {
        let errorData = fetchError.message || fetchError.name

        if (options.onFetchError) {
          ({ error: errorData, data: responseData } = await options.onFetchError({
            data: responseData,
            error: fetchError,
            response: response.value,
          }))
        }

        error.value = errorData
        if (options.updateDataOnError)
          data.value = responseData

        errorEvent.trigger(fetchError)
        if (throwOnFailed)
          throw fetchError
        return null
      })
      .finally(() => {
        if (currentExecuteCounter === executeCounter)
          loading(false)
        if (timer)
          timer.stop()
        finallyEvent.trigger(null)
      })
  }

  const refetch = toRef(options.refetch)
  watch(
    [
      refetch,
      toRef(url),
    ],
    ([refetch]) => refetch && execute(),
    { deep: true },
  )

  const shell: UseFetchReturn<T> = {
    isFinished: readonly(isFinished),
    isFetching: readonly(isFetching),
    statusCode,
    response,
    error,
    data,
    canAbort,
    aborted,
    abort,
    execute,

    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    // method
    get: setMethod('GET'),
    put: setMethod('PUT'),
    post: setMethod('POST'),
    delete: setMethod('DELETE'),
    patch: setMethod('PATCH'),
    head: setMethod('HEAD'),
    options: setMethod('OPTIONS'),
    // type
    json: setType('json'),
    text: setType('text'),
    blob: setType('blob'),
    arrayBuffer: setType('arrayBuffer'),
    formData: setType('formData'),
  }

  function setMethod(method: HttpMethod) {
    return (payload?: unknown, payloadType?: string) => {
      if (!isFetching.value) {
        config.method = method
        config.payload = payload
        config.payloadType = payloadType

        // watch for payload changes
        if (isRef(config.payload)) {
          watch(
            [
              refetch,
              toRef(config.payload),
            ],
            ([refetch]) => refetch && execute(),
            { deep: true },
          )
        }

        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  function waitUntilFinished() {
    return new Promise<UseFetchReturn<T>>((resolve, reject) => {
      until(isFinished).toBe(true)
        .then(() => resolve(shell))
        .catch(error => reject(error))
    })
  }

  function setType(type: DataType) {
    return () => {
      if (!isFetching.value) {
        config.type = type
        return {
          ...shell,
          then(onFulfilled: any, onRejected: any) {
            return waitUntilFinished()
              .then(onFulfilled, onRejected)
          },
        } as any
      }
      return undefined
    }
  }

  if (options.immediate)
    Promise.resolve().then(() => execute())

  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished()
        .then(onFulfilled, onRejected)
    },
  }
}

function joinPaths(start: string, end: string): string {
  if (!start.endsWith('/') && !end.startsWith('/'))
    return `${start}/${end}`

  return `${start}${end}`
}
