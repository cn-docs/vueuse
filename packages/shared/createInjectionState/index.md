---
category: State
---

# createInjectionState

创建可注入到组件中的全局状态。

## 用法

```ts
// useCounterStore.ts
import { computed, ref } from 'vue'
import { createInjectionState } from '@vueuse/core'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // 状态
  const count = ref(initialValue)

  // 计算属性
  const double = computed(() => count.value * 2)

  // 动作
  function increment() {
    count.value++
  }

  return { count, double, increment }
})

export { useProvideCounterStore }
// 如果想隐藏 `useCounterStore` 并将其包装在默认值逻辑或抛出错误逻辑中，请不要导出 `useCounterStore`
export { useCounterStore }

export function useCounterStoreWithDefaultValue() {
  return useCounterStore() ?? {
    count: ref(0),
    double: ref(0),
    increment: () => {},
  }
}

export function useCounterStoreOrThrow() {
  const counterStore = useCounterStore()
  if (counterStore == null)
    throw new Error('请在适当的父组件上调用 `useProvideCounterStore`')
  return counterStore
}
```

```vue
<!-- RootComponent.vue -->
<script setup lang="ts">
import { useProvideCounterStore } from './useCounterStore'

useProvideCounterStore(0)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

```vue
<!-- CountComponent.vue -->
<script setup lang="ts">
import { useCounterStore } from './useCounterStore'

// 使用非空断言操作符来忽略未提供存储的情况。
const { count, double } = useCounterStore()!
// 如果要允许组件在未提供存储的情况下工作，可以改用以下代码：
// const { count, double } = useCounterStore() ?? { count: ref(0), double: ref(0) }
// 同样，您可以使用另一个钩子来提供默认值
// const { count, double } = useCounterStoreWithDefaultValue()
// 或者抛出错误
// const { count, double } = useCounterStoreOrThrow()
</script>

<template>
  <ul>
    <li>
      计数: {{ count }}
    </li>
    <li>
      两倍: {{ double }}
    </li>
  </ul>
</template>
```

```vue
<!-- ButtonComponent.vue -->
<script setup lang="ts">
import { useCounterStore } from './useCounterStore'

// 使用非空断言操作符来忽略未提供存储的情况。
const { increment } = useCounterStore()!
</script>

<template>
  <button @click="increment">
    +
  </button>
</template>
```

## 提供自定义的 InjectionKey

```ts
// useCounterStore.ts
import { computed, ref } from 'vue'
import { createInjectionState } from '@vueuse/core'

// 自定义 injectionKey
const CounterStoreKey = 'counter-store'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // 状态
  const count = ref(initialValue)

  // 计算属性
  const double = computed(() => count.value * 2)

  // 动作
  function increment() {
    count.value++
  }

  return { count, double, increment }
}, { injectionKey: CounterStoreKey })
```
