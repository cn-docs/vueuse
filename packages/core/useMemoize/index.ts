import { shallowReactive } from 'vue'

type CacheKey = any

/**
 * 自定义记忆缓存处理器
 */
export interface UseMemoizeCache<Key, Value> {
  /**
   * 获取键对应的值
   */
  get: (key: Key) => Value | undefined
  /**
   * 设置键值对
   */
  set: (key: Key, value: Value) => void
  /**
   * 返回键是否存在的标志
   */
  has: (key: Key) => boolean
  /**
   * 删除键对应的值
   */
  delete: (key: Key) => void
  /**
   * 清除缓存
   */
  clear: () => void
}

/**
 * 记忆化函数
 */
export interface UseMemoizeReturn<Result, Args extends unknown[]> {
  /**
   * 从缓存获取结果或调用记忆化函数
   */
  (...args: Args): Result
  /**
   * 调用记忆化函数并更新缓存
   */
  load: (...args: Args) => Result
  /**
   * 删除给定参数的缓存
   */
  delete: (...args: Args) => void
  /**
   * 清除缓存
   */
  clear: () => void
  /**
   * 为给定参数生成缓存键
   */
  generateKey: (...args: Args) => CacheKey
  /**
   * 缓存容器
   */
  cache: UseMemoizeCache<CacheKey, Result>
}

export interface UseMemoizeOptions<Result, Args extends unknown[]> {
  getKey?: (...args: Args) => string | number
  cache?: UseMemoizeCache<CacheKey, Result>
}

/**
 * 基于参数的响应式函数结果缓存
 */
export function useMemoize<Result, Args extends unknown[]>(
  resolver: (...args: Args) => Result,
  options?: UseMemoizeOptions<Result, Args>,
): UseMemoizeReturn<Result, Args> {
  const initCache = (): UseMemoizeCache<CacheKey, Result> => {
    if (options?.cache)
      return shallowReactive(options.cache)
    return shallowReactive(new Map<CacheKey, Result>())
  }
  const cache = initCache()

  /**
   * 从参数生成键
   */
  const generateKey = (...args: Args) => options?.getKey
    ? options.getKey(...args)
    // 默认键：序列化参数
    : JSON.stringify(args)

  /**
   * 加载数据并保存到缓存中
   */
  const _loadData = (key: string | number, ...args: Args): Result => {
    cache.set(key, resolver(...args))
    return cache.get(key) as Result
  }
  const loadData = (...args: Args): Result => _loadData(generateKey(...args), ...args)

  /**
   * 从缓存中删除键
   */
  const deleteData = (...args: Args): void => {
    cache.delete(generateKey(...args))
  }

  /**
   * 清除缓存数据
   */
  const clearData = () => {
    cache.clear()
  }

  const memoized: Partial<UseMemoizeReturn<Result, Args>> = (...args: Args): Result => {
    // Get data from cache
    const key = generateKey(...args)
    if (cache.has(key))
      return cache.get(key) as Result
    return _loadData(key, ...args)
  }
  memoized.load = loadData
  memoized.delete = deleteData
  memoized.clear = clearData
  memoized.generateKey = generateKey
  memoized.cache = cache

  return memoized as UseMemoizeReturn<Result, Args>
}
