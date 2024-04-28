---
category: Browser
---

# useScreenSafeArea

响应式 `env(safe-area-inset-*)`

![image](https://webkit.org/wp-content/uploads/safe-areas-1.png)

## 用法

为了使页面完全呈现在屏幕中，首先必须在 `viewport` meta 标签中设置额外属性 `viewport-fit=cover`，viewport meta 标签可能如下所示：

```html
<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
```

然后我们可以在组件中使用 `useScreenSafeArea` 如下所示：

```ts
import { useScreenSafeArea } from '@vueuse/core'

const {
  top,
  right,
  bottom,
  left,
} = useScreenSafeArea()
```

有关更多详细信息，请参阅此文档：[Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)

## 组件使用

```vue
<template>
  <UseScreenSafeArea top right bottom left>
    content
  </UseScreenSafeArea>
</template>
```
