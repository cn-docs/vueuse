---
category: Browser
---

# useImage

响应式加载浏览器中的图像，您可以等待结果以显示它，或显示一个备用图像。

## 使用方法

```vue
<script setup>
import { useImage } from '@vueuse/core'

const avatarUrl = 'https://place.dog/300/200'
const { isLoading } = useImage({ src: avatarUrl })
</script>

<template>
  <span v-if="isLoading">加载中</span>
  <img v-else :src="avatarUrl">
</template>
```

## 组件使用

```vue
<template>
  <UseImage src="https://place.dog/300/200">
    <template #loading>
      加载中..
    </template>

    <template #error>
      加载失败
    </template>
  </UseImage>
</template>
```
