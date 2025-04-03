---
category: Browser
---

# useSSRWidth

用于设置全局视口宽度，该宽度将在渲染依赖视口宽度的 SSR 组件时使用，如 [`useMediaQuery`](../useMediaQuery/index.md) 或 [`useBreakpoints`](../useBreakpoints/index.md)

## 用法

```js
import { provideSSRWidth } from '@vueuse/core'

const app = createApp(App)

provideSSRWidth(500, app)
```

或者在根组件中

```vue
<script setup>
import { provideSSRWidth } from '@vueuse/core'

provideSSRWidth(500)
</script>
```

如果需要，可以在子组件中获取提供的值

```vue
<script setup>
import { useSSRWidth } from '@vueuse/core'

const width = useSSRWidth()
</script>
```
