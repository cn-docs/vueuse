---
category: Browser
---

# usePreferredLanguages

响应式的[导航器语言](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/languages)。它为Web开发人员提供了有关用户首选语言的信息。例如，这可能有助于根据用户的首选语言调整用户界面的语言，以提供更好的体验。

## 用法

```js
import { usePreferredLanguages } from '@vueuse/core'

const languages = usePreferredLanguages()
```

## 组件使用

```vue
<template>
  <UsePreferredLanguages v-slot="{ languages }">
    首选语言: {{ languages }}
  </UsePreferredLanguages>
</template>
```
