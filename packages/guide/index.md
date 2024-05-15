# 入门指南

<CourseLink href="https://vueschool.io/courses/vueuse-for-everyone?friend=vueuse">通过视频学习 VueUse</CourseLink>

VueUse 是基于[组合 API](https://cn.vuejs.org/guide/extras/composition-api-faq)的一系列实用函数集合。在继续之前，我们假设您已经对[组合 API](https://cn.vuejs.org/guide/extras/composition-api-faq)的基本概念有所了解。

## 安装

> 🎩 从 v4.0 开始，它通过 [vue-demi](https://github.com/vueuse/vue-demi) 的力量支持 Vue 2 和 3 **在一个单独的包中**！

```bash
npm i @vueuse/core
```

[附加组件](/add-ons.html) | [Nuxt 模块](/guide/index.html#nuxt)

> 从 v6.0 开始，VueUse 需要 `vue` >= v3.2 或 `@vue/composition-api` >= v1.1

###### 示例

- [Vite + Vue 3](https://github.com/vueuse/vueuse-vite-starter)
- [Nuxt 3 + Vue 3](https://github.com/antfu/vitesse-nuxt3)
- [Webpack + Vue 3](https://github.com/vueuse/vueuse-vue3-example)
- [Nuxt 2 + Vue 2](https://github.com/antfu/vitesse-nuxt-bridge)
- [Vue CLI + Vue 2](https://github.com/vueuse/vueuse-vue2-example)

### CDN

```vue
<script src="https://unpkg.com/@vueuse/shared"></script>

<script src="https://unpkg.com/@vueuse/core"></script>
```

它将以 `window.VueUse` 的形式暴露在全局中。

### Nuxt

从 v7.2.0 开始，我们提供了一个 Nuxt 模块，用于在 Nuxt 3 和 Nuxt Bridge 中启用自动导入。

```bash
npm i -D @vueuse/nuxt @vueuse/core
```

Nuxt 3

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
```

Nuxt 2

```ts
// nuxt.config.js
export default {
  buildModules: [
    '@vueuse/nuxt',
  ],
}
```

然后在您的 Nuxt 应用程序中的任何地方使用 VueUse 函数。例如：

```vue twoslash
<script setup lang="ts">
// ---cut-start---
import { useMouse } from '@vueuse/core'
// ---cut-end---
const { x, y } = useMouse()
</script>

<template>
  <div>pos: {{ x }}, {{ y }}</div>
</template>
```

## 用法示例

只需从 `@vueuse/core` 导入您需要的函数

```vue twoslash
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// 跟踪鼠标位置
const { x, y } = useMouse()

// 用户是否喜欢暗黑主题
const isDark = usePreferredDark()

// 在本地存储中持久化状态
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
```

更多详情请参考[函数列表](/functions)。
