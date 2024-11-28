# 开始使用

<CourseLink href="https://vueschool.io/courses/vueuse-for-everyone?friend=vueuse">观看视频学习 VueUse</CourseLink>

VueUse 是一个基于 [组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html) 的实用函数集合。在继续之前，我们假设你已经熟悉 [组合式 API](https://vuejs.org/guide/extras/composition-api-faq.html) 的基本概念。

## 安装

> 从 v12.0 开始，VueUse 不再支持 Vue 2。如需 Vue 2 支持请使用 v11.x 版本。

```bash
npm i @vueuse/core
```

[附加组件](/add-ons.html) | [Nuxt 模块](/guide/index.html#nuxt)

###### 示例项目

- [Vite + Vue 3](https://github.com/vueuse/vueuse-vite-starter)
- [Nuxt 3 + Vue 3](https://github.com/antfu/vitesse-nuxt3)
- [Webpack + Vue 3](https://github.com/vueuse/vueuse-vue3-example)

### CDN

```vue
<script src="https://unpkg.com/@vueuse/shared"></script>

<script src="https://unpkg.com/@vueuse/core"></script>
```

这将会在全局暴露为 `window.VueUse`

### Nuxt

从 v7.2.0 开始，我们发布了一个 Nuxt 模块，为 Nuxt 3 和 Nuxt Bridge 提供自动导入功能。

使用 [nuxi](https://nuxt.com/docs/api/commands/module) 在你的应用中安装 vueuse 模块：

```bash
npx nuxi@latest module add vueuse
```

或使用 npm：

```bash
npm i -D @vueuse/nuxt @vueuse/core
```

Nuxt 3 配置：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
})
```

Nuxt 2 配置：

```ts
// nuxt.config.js
export default {
  buildModules: [
    '@vueuse/nuxt',
  ],
}
```

然后你就可以在 Nuxt 应用的任何地方使用 VueUse 函数。例如：

```vue twoslash
<script setup lang="ts">
// ---cut-start---
// Actually auto-imported, but here we need to tell TwoSlash about it
import { useMouse } from '@vueuse/core'
// ---cut-end---
const { x, y } = useMouse()
</script>

<template>
  <div>位置：{{ x }}, {{ y }}</div>
</template>
```

## 使用示例

只需从 `@vueuse/core` 中导入你需要的函数

```vue twoslash
<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

// 跟踪鼠标位置
const { x, y } = useMouse()

// 用户是否偏好深色主题
const isDark = usePreferredDark()

// 在 localStorage 中持久化状态
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)
</script>
```

更多详细信息请参考[函数列表](/functions)。
