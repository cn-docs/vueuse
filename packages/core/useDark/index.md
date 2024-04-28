---
category: Browser
related:
  - useColorMode
  - usePreferredDark
  - useStorage
---

# useDark

响应式暗模式，自动数据持久化。

<CourseLink href="https://vueschool.io/lessons/theming-with-vueuse-usedark-and-usecolormode?friend=vueuse">通过 Vue School 的这个免费视频课程学习如何使用 useDark！</CourseLink>

## 基本用法

```js
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

## 行为

`useDark` 结合了 `usePreferredDark` 和 `useStorage`。在启动时，它会从 localStorage/sessionStorage 中读取值（键是可配置的），以查看是否有用户配置的颜色方案，如果没有，它将使用用户的系统偏好。当您更改 `isDark` 引用时，它将更新相应元素的属性，然后将偏好存储到存储（默认键：`vueuse-color-scheme`）以进行持久化。

> 请注意 `useDark` 仅为您处理 DOM 属性更改，以便在 CSS 中应用正确的选择器。它不处理实际样式、主题或 CSS。

## 配置

默认情况下，它使用 [Tailwind CSS 推荐的暗模式](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)，当将类 `dark` 应用于 `html` 标签时启用暗模式，例如：

```html
<!--light-->
<html>
  ...
</html>

<!--dark-->
<html class="dark">
  ...
</html>
```

但是，您也可以自定义它以使其与大多数 CSS 框架一起工作。

例如：

```ts
const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
```

将会工作如下

```html
<!--light-->
<html>
  <body color-scheme="light">
    ...
  </body>
</html>

<!--dark-->
<html>
  <body color-scheme="dark">
    ...
  </body>
</html>
```

如果上述配置仍然不符合您的需求，您可以使用`onChanged`选项来完全控制您如何处理更新。

```ts
const isDark = useDark({
  onChanged(dark: boolean) {
    // 更新 dom，调用 API 或其他操作
  },
})
```

## 组件用法

```vue
<template>
  <UseDark v-slot="{ isDark, toggleDark }">
    <button @click="toggleDark()">
      Is Dark: {{ isDark }}
    </button>
  </UseDark>
</template>
```
