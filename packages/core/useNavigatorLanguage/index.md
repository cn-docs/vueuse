---
category: Sensors
---

# useNavigatorLanguage

响应式地获取 [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)。

## 使用方法

```ts
import { useNavigatorLanguage } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const { language } = useNavigatorLanguage()

    watch(language, () => {
      // 监听值的变化
    })

    return {
      language,
    }
  },
})
```
