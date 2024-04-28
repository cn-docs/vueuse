---
category: Browser
---

# useTextDirection

元素文本的响应式 [dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)。

## 用法

```ts
import { useTextDirection } from '@vueuse/core'

const dir = useTextDirection() // Ref<'ltr' | 'rtl' | 'auto'>
```

默认情况下，当将 dir `rtl` 应用于 `html` 标签时，它返回 `rtl` 方向，例如：

```html
<!--ltr-->
<html>
  ...
</html>

<!--rtl-->
<html dir="rtl">
  ...
</html>
```

## 选项

```ts
import { useTextDirection } from '@vueuse/core'

const mode = useTextDirection({
  selector: 'body'
}) // Ref<'ltr' | 'rtl' | 'auto'>
```
