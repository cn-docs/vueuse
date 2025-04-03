---
category: Browser
---

# useBreakpoints

响应式的视口断点。

## 用法

```js
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greaterOrEqual('sm') // sm 及以上
const largerThanSm = breakpoints.greater('sm') // 仅大于 sm
const lgAndSmaller = breakpoints.smallerOrEqual('lg') // lg 及以下
const smallerThanLg = breakpoints.smaller('lg') // 仅小于 lg
```

```vue
<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // 可选
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

// 可以是 'mobile' 或 'tablet' 或 'laptop' 或 'desktop'
const activeBreakpoint = breakpoints.active()

// true 或 false
const laptop = breakpoints.between('laptop', 'desktop')
</script>

<template>
  <div :class="activeBreakpoint">
    ...
  </div>
</template>
```

#### 服务端渲染和 Nuxt

如果你在启用 SSR 的情况下使用 `useBreakpoints`，那么你需要指定在服务器端和水合之前要渲染的屏幕尺寸，以避免水合不匹配。

```js
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(
  breakpointsTailwind,
  { ssrWidth: 768 } // 将启用 SSR 模式并像屏幕宽度为 768px 一样渲染
)
```

或者，你可以使用 [`provideSSRWidth`](../useSSRWidth/index.md) 为你的应用全局设置。

## 预设

- Tailwind: `breakpointsTailwind`
- Bootstrap v5: `breakpointsBootstrapV5`
- Vuetify v2: `breakpointsVuetifyV2` (已弃用: `breakpointsVuetify`)
- Vuetify v3: `breakpointsVuetifyV3`
- Ant Design: `breakpointsAntDesign`
- Quasar v2: `breakpointsQuasar`
- Sematic: `breakpointsSematic`
- Master CSS: `breakpointsMasterCss`
- Prime Flex: `breakpointsPrimeFlex`
- ElementUI / ElementPlus: `breakpointsElement`

_断点预设不会自动导入，因为它们不以 `use` 开头以保持 VueUse 的作用域。它们必须显式导入：_

```js
import { breakpointsTailwind } from '@vueuse/core'
// 以此类推
```
