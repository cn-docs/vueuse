---
category: Sensors
---

# useNavigatorLanguage

响应式地获取 [navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)。

## 使用方法

```ts
import { defineComponent, ref, watch } from 'vue'
import { useNavigatorLanguage } from '@vueuse/core'

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
