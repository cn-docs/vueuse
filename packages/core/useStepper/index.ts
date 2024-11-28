import type { MaybeRef } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

export interface UseStepperReturn<StepName, Steps, Step> {
  /** 步骤列表。 */
  steps: Readonly<Ref<Steps>>
  /** 步骤名称列表。 */
  stepNames: Readonly<Ref<StepName[]>>
  /** 当前步骤的索引。 */
  index: Ref<number>
  /** 当前步骤。 */
  current: ComputedRef<Step>
  /** 下一个步骤，如果当前步骤是最后一个则为 undefined。 */
  next: ComputedRef<StepName | undefined>
  /** 上一个步骤，如果当前步骤是第一个则为 undefined。 */
  previous: ComputedRef<StepName | undefined>
  /** 当前步骤是否为第一个。 */
  isFirst: ComputedRef<boolean>
  /** 当前步骤是否为最后一个。 */
  isLast: ComputedRef<boolean>
  /** 获取指定索引处的步骤。 */
  at: (index: number) => Step | undefined
  /** 根据指定名称获取步骤。 */
  get: (step: StepName) => Step | undefined
  /** 跳转至指定步骤。 */
  goTo: (step: StepName) => void
  /** 跳转至下一个步骤。如果当前步骤是最后一个，则不执行任何操作。 */
  goToNext: () => void
  /** 跳转至上一个步骤。如果当前步骤是第一个，则不执行任何操作。 */
  goToPrevious: () => void
  /** 回到给定步骤，仅当当前步骤在之后时执行。 */
  goBackTo: (step: StepName) => void
  /** 检查给定步骤是否为下一个步骤。 */
  isNext: (step: StepName) => boolean
  /** 检查给定步骤是否为上一个步骤。 */
  isPrevious: (step: StepName) => boolean
  /** 检查给定步骤是否为当前步骤。 */
  isCurrent: (step: StepName) => boolean
  /** 检查当前步骤是否在给定步骤之前。 */
  isBefore: (step: StepName) => boolean
  /** 检查当前步骤是否在给定步骤之后。 */
  isAfter: (step: StepName) => boolean
}

export function useStepper<T extends string | number>(steps: MaybeRef<T[]>, initialStep?: T): UseStepperReturn<T, T[], T>
export function useStepper<T extends Record<string, any>>(steps: MaybeRef<T>, initialStep?: keyof T): UseStepperReturn<Exclude<keyof T, symbol>, T, T[keyof T]>
export function useStepper(steps: any, initialStep?: any): UseStepperReturn<any, any, any> {
  const stepsRef = ref<any[]>(steps)
  const stepNames = computed<any[]>(() => Array.isArray(stepsRef.value) ? stepsRef.value : Object.keys(stepsRef.value))
  const index = ref(stepNames.value.indexOf(initialStep ?? stepNames.value[0]))
  const current = computed(() => at(index.value))
  const isFirst = computed(() => index.value === 0)
  const isLast = computed(() => index.value === stepNames.value.length - 1)
  const next = computed(() => stepNames.value[index.value + 1])
  const previous = computed(() => stepNames.value[index.value - 1])

  function at(index: number) {
    if (Array.isArray(stepsRef.value))
      return stepsRef.value[index]

    return stepsRef.value[stepNames.value[index]]
  }

  function get(step: any) {
    if (!stepNames.value.includes(step))
      return

    return at(stepNames.value.indexOf(step))
  }

  function goTo(step: any) {
    if (stepNames.value.includes(step))
      index.value = stepNames.value.indexOf(step)
  }

  function goToNext() {
    if (isLast.value)
      return

    index.value++
  }

  function goToPrevious() {
    if (isFirst.value)
      return

    index.value--
  }

  function goBackTo(step: any) {
    if (isAfter(step))
      goTo(step)
  }

  function isNext(step: any) {
    return stepNames.value.indexOf(step) === index.value + 1
  }

  function isPrevious(step: any) {
    return stepNames.value.indexOf(step) === index.value - 1
  }

  function isCurrent(step: any) {
    return stepNames.value.indexOf(step) === index.value
  }

  function isBefore(step: any) {
    return index.value < stepNames.value.indexOf(step)
  }

  function isAfter(step: any) {
    return index.value > stepNames.value.indexOf(step)
  }

  return {
    steps: stepsRef,
    stepNames,
    index,
    current,
    next,
    previous,
    isFirst,
    isLast,
    at,
    get,
    goTo,
    goToNext,
    goToPrevious,
    goBackTo,
    isNext,
    isPrevious,
    isCurrent,
    isBefore,
    isAfter,
  }
}
