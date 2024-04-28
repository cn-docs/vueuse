---
category: Browser
---

# 使用浏览器位置

响应式浏览器位置

> 注意：如果您正在使用 Vue Router，请改用由 Vue Router 提供的 [`useRoute`](https://router.vuejs.org/guide/advanced/composition-api.html)。

## 使用方法

```js
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
```

## 组件用法

```vue
<UseBrowserLocation v-slot="{ location }">
  浏览器位置: {{ location }}
</UseBrowserLocation>
```
