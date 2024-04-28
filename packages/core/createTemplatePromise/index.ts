import type { DefineComponent, Ref, TransitionGroupProps } from 'vue-demi'
import { Fragment, TransitionGroup, defineComponent, h, isVue3, ref, shallowReactive } from 'vue-demi'

export interface TemplatePromiseProps<Return, Args extends any[] = []> {
  /**
   * Promise 实例。
   */
  promise: Promise<Return> | undefined
  /**
   * 解决（完成）promise。
   */
  resolve: (v: Return | Promise<Return>) => void
  /**
   * 拒绝（失败）promise。
   */
  reject: (v: any) => void
  /**
   * 传递给 TemplatePromise.start() 的参数。
   */
  args: Args
  /**
   * 表示 promise 是否正在解决中。
   * 当向 `resolve` 传递另一个 promise 时，这将被设置为 `true` 直到该 promise 被解决。
   */
  isResolving: boolean
  /**
   * 传递给 createTemplatePromise() 的选项。
   */
  options: TemplatePromiseOptions
  /**
   * 用于列表渲染的唯一键。
   */
  key: number
}

export interface TemplatePromiseOptions {
  /**
   * 决定 promise 是否只能一次调用一次。
   *
   * @default false 默认为 false
   */
  singleton?: boolean

  /**
   * promise 的过渡属性。
   */
  transition?: TransitionGroupProps
}

export type TemplatePromise<Return, Args extends any[] = []> = DefineComponent<{}> & {
  new(): {
    $slots: {
      default: (_: TemplatePromiseProps<Return, Args>) => any
    }
  }
} & {
  start: (...args: Args) => Promise<Return>
}

/**
 * 将模板作为 Promise。适用于构建自定义对话框、模态框、提示框等。
 *
 * @see https://vueuse.org/createTemplatePromise
 */
export function createTemplatePromise<Return, Args extends any[] = []>(
  options: TemplatePromiseOptions = {},
): TemplatePromise<Return, Args> {
  // compatibility: Vue 3 or above
  if (!isVue3) {
    if (process.env.NODE_ENV !== 'production')
      throw new Error('[VueUse] createTemplatePromise only works in Vue 3 or above.')
    // @ts-expect-error incompatible
    return
  }

  let index = 0
  const instances = ref([]) as Ref<TemplatePromiseProps<Return, Args>[]>

  function create(...args: Args) {
    const props = shallowReactive({
      key: index++,
      args,
      promise: undefined,
      resolve: () => {},
      reject: () => {},
      isResolving: false,
      options,
    }) as TemplatePromiseProps<Return, Args>

    instances.value.push(props)

    props.promise = new Promise<Return>((_resolve, _reject) => {
      props.resolve = (v) => {
        props.isResolving = true
        return _resolve(v)
      }
      props.reject = _reject
    })
      .finally(() => {
        props.promise = undefined
        const index = instances.value.indexOf(props)
        if (index !== -1)
          instances.value.splice(index, 1)
      })

    return props.promise
  }

  function start(...args: Args) {
    if (options.singleton && instances.value.length > 0)
      return instances.value[0].promise
    return create(...args)
  }

  const component = defineComponent((_, { slots }) => {
    const renderList = () => instances.value.map(props => h(Fragment, { key: props.key }, slots.default?.(props)))
    if (options.transition)
      return () => h(TransitionGroup, options.transition, renderList)
    return renderList
  })

  // eslint-disable-next-line ts/prefer-ts-expect-error
  // @ts-ignore There's a breaking type change in Vue 3.3 <https://github.com/vuejs/core/pull/7963>
  component.start = start

  return component as any
}
