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
  // state
  const count = ref(initialValue)

  // getters
  const double = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  return { count, double, increment }
})

export { useProvideCounterStore }
// 如果你想隐藏 `useCounterStore` 并将其包装在默认值逻辑或错误逻辑中，请不要导出 `useCounterStore`。
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
    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')
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
// 如果你想让组件在没有提供存储的情况下也能正常工作，你可以使用以下代码:
// const { count, double } = useCounterStore() ?? { count: ref(0), double: ref(0) }
// 此外，你还可以使用另一个钩子来提供默认值。
// const { count, double } = useCounterStoreWithDefaultValue()
// 或者抛出错误。
// const { count, double } = useCounterStoreOrThrow()
</script>

<template>
  <ul>
    <li>
      count: {{ count }}
    </li>
    <li>
      double: {{ double }}
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

## 提供一个自定义的 InjectionKey

```ts
// useCounterStore.ts
import { computed, ref } from 'vue'
import { createInjectionState } from '@vueuse/core'

// 自定义的 InjectionKey
const CounterStoreKey = 'counter-store'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // state
  const count = ref(initialValue)

  // getters
  const double = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  return { count, double, increment }
}, { injectionKey: CounterStoreKey })
```
