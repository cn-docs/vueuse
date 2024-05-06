import type { IncomingMessage } from 'node:http'
import { tryOnScopeDispose } from '@vueuse/shared'
import { ref } from 'vue-demi'
import Cookie from 'universal-cookie'

type RawCookies = Record<string, string>

/**
 * 创建一个新的 {@link useCookies} 函数
 * @param req - 传入的 http 请求（用于 SSR）
 * @see https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie universal-cookie
 * @description 使用请求创建一个 universal-cookie 实例（默认是 window.document.cookie），并返回带有提供的 universal-cookie 实例的 {@link useCookies} 函数
 */
export function createCookies(req?: IncomingMessage) {
  const universalCookie = new Cookie(req ? req.headers.cookie : null)

  return (
    dependencies?: string[] | null,
    { doNotParse = false, autoUpdateDependencies = false } = {},
  ) => useCookies(dependencies, { doNotParse, autoUpdateDependencies }, universalCookie)
}

/**
 * 用于处理 cookie 的响应式方法（如果使用 SSR，请改用 {@link createCookies} 方法）
 * @param dependencies - 监视 cookie 名称的数组。如果不想监视 cookie 更改，请传入空数组。
 * @param options
 * @param options.doNotParse - 不尝试解析值为 JSON
 * @param options.autoUpdateDependencies - 自动更新监视依赖项
 * @param cookies - universal-cookie 实例
 */
export function useCookies(
  dependencies?: string[] | null,
  { doNotParse = false, autoUpdateDependencies = false } = {},
  cookies = new Cookie(),
) {
  const watchingDependencies = autoUpdateDependencies ? [...dependencies || []] : dependencies

  let previousCookies = cookies.getAll<RawCookies>({ doNotParse: true })

  /**
   * 添加对 get/getAll 方法的响应性
   */
  const touches = ref(0)

  const onChange = () => {
    const newCookies = cookies.getAll({ doNotParse: true })

    if (
      shouldUpdate(
        watchingDependencies || null,
        newCookies,
        previousCookies,
      )
    )
      touches.value++

    previousCookies = newCookies
  }

  cookies.addChangeListener(onChange)

  tryOnScopeDispose(() => {
    cookies.removeChangeListener(onChange)
  })

  return {
    /**
     * 通过名称响应式地获取 cookie。如果 **autoUpdateDependencies = true**，则会更新监视依赖项
     */
    get: <T = any>(...args: Parameters<Cookie['get']>) => {
      /**
       * 如果需要，自动更新监视依赖项
       */
      if (autoUpdateDependencies && watchingDependencies && !watchingDependencies.includes(args[0]))
        watchingDependencies.push(args[0])

      // eslint-disable-next-line no-unused-expressions
      touches.value // adds reactivity to method
      return cookies.get<T>(args[0], { doNotParse, ...args[1] })
    },
    /**
     * 响应式地获取所有 cookie
     */
    getAll: <T = any>(...args: Parameters<Cookie['getAll']>) => {
      // eslint-disable-next-line no-unused-expressions
      touches.value // 为方法添加响应性
      return cookies.getAll<T>({ doNotParse, ...args[0] })
    },
    set: (...args: Parameters<Cookie['set']>) => cookies.set(...args),
    remove: (...args: Parameters<Cookie['remove']>) => cookies.remove(...args),
    addChangeListener: (...args: Parameters<Cookie['addChangeListener']>) => cookies.addChangeListener(...args),
    removeChangeListener: (...args: Parameters<Cookie['removeChangeListener']>) => cookies.removeChangeListener(...args),
  }
}

function shouldUpdate(
  dependencies: string[] | null,
  newCookies: RawCookies,
  oldCookies: RawCookies,
) {
  if (!dependencies)
    return true

  for (const dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency])
      return true
  }

  return false
}
