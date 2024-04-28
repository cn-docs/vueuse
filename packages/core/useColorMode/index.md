---
category: Browser
related:
  - useDark
  - usePreferredDark
  - useStorage
---

# useColorMode

使用自动数据持久化的响应式颜色模式 (dark / light / customs)。

## 基本用法

```js
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>
```

默认情况下，它将使用 `usePreferredDark`（也称为 `auto` 模式）匹配用户浏览器的偏好。在读取引用时，默认将返回当前的颜色模式（`dark`、`light` 或您的自定义模式）。可以通过启用 `emitAuto` 选项将 `auto` 模式包含在返回的模式中。在写入引用时，它将触发 DOM 更新并将颜色模式持久化到本地存储（或您的自定义存储）。您可以传递 `auto` 来设置回自动模式。

```ts
mode.value // 'dark' | 'light'

mode.value = 'dark' // 切换到暗模式并持久化

mode.value = 'auto' // 切换到自动模式
```

## 配置

```js
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  attribute: 'theme',
  modes: {
    // 自定义颜色
    dim: 'dim',
    cafe: 'cafe',
  },
}) // Ref<'dark' | 'light' | 'dim' | 'cafe'>
```

## 高级用法

您还可以明确访问系统偏好和存储的用户覆盖模式。

```js
import { useColorMode } from '@vueuse/core'

const { system, store } = useColorMode()

system.value // 'dark' | 'light'
store.value // 'dark' | 'light' | 'auto'

const myColorMode = computed(() => store.value === 'auto' ? system.value : store.value)
```

## 组件用法

```vue
<template>
  <UseColorMode v-slot="{ mode }">
    <button @click="mode = mode === 'dark' ? 'light' : 'dark'">
      Mode {{ mode }}
    </button>
  </UseColorMode>
</template>
```
