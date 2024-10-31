---
category: Elements
---

# useMutationObserver

监视对 DOM 树的变更。[MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## 用法

```ts
import { useMutationObserver } from '@vueuse/core'
import { ref } from 'vue'

export default {
  setup() {
    const el = ref(null)
    const messages = ref([])

    useMutationObserver(el, (mutations) => {
      if (mutations[0])
        messages.value.push(mutations[0].attributeName)
    }, {
      attributes: true,
    })

    return {
      el,
      messages,
    }
  },
}
```
