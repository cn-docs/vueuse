---
category: Browser
---

# useStyleTag

在 `<head>` 中注入响应式的 `style` 元素。

## 用法

### 基本用法

提供一个 CSS 字符串，然后 `useStyleTag` 将自动生成一个 id 并将其注入到 `<head>` 中。

```js
import { useStyleTag } from '@vueuse/core'

const {
  id,
  css,
  load,
  unload,
  isLoaded,
} = useStyleTag('.foo { margin-top: 32px; }')

// 以后可以修改样式
css.value = '.foo { margin-top: 64px; }'
```

这段代码将被注入到 `<head>` 中：

```html
<style id="vueuse_styletag_1">
  .foo {
    margin-top: 64px;
  }
</style>
```

### 自定义 ID

如果需要定义自己的 id，可以将 `id` 作为第一个参数传递。

```js
import { useStyleTag } from '@vueuse/core'

useStyleTag('.foo { margin-top: 32px; }', { id: 'custom-id' })
```

```html
<!-- 注入到 <head> 中 -->
<style id="custom-id">
  .foo {
    margin-top: 32px;
  }
</style>
```

### 媒体查询

你可以在对象中的最后一个参数中传递媒体属性。

```js
useStyleTag('.foo { margin-top: 32px; }', { media: 'print' })
```

```html
<!-- 注入到 <head> 中 -->
<style id="vueuse_styletag_1" media="print">
  .foo {
    margin-top: 32px;
  }
</style>
```
