---
category: Time
---

# useTimeAgo

响应式的相对时间。当时间发生变化时，自动更新相对时间字符串。

## 用法

```js
import { useTimeAgo } from '@vueuse/core'

const timeAgo = useTimeAgo(new Date(2021, 0, 1))
```

## 组件用法

```vue
<template>
  <UseTimeAgo v-slot="{ timeAgo }" :time="new Date(2021, 0, 1)">
    Time Ago: {{ timeAgo }}
  </UseTimeAgo>
</template>
```

## 非响应式用法

如果您不需要响应性，可以使用 `formatTimeAgo` 函数获取格式化的字符串，而不是一个 Ref。

```js
import { formatTimeAgo } from '@vueuse/core'

const timeAgo = formatTimeAgo(new Date(2021, 0, 1)) // 字符串
```
