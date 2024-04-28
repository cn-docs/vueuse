---
category: Animation
---

# useNow

响应式的当前日期实例。

## 使用方法

```js
import { useNow } from '@vueuse/core'

const now = useNow()
```

```js
const { now, pause, resume } = useNow({ controls: true })
```

## 组件使用

```vue
<template>
  <UseNow v-slot="{ now, pause, resume }">
    当前时间：{{ now }}
    <button @click="pause()">
      暂停
    </button>
    <button @click="resume()">
      恢复
    </button>
  </UseNow>
</template>
```
