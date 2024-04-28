---
category: Utilities
---

# useBase64

响应式的 Base64 转换。 支持 plain text, buffer, files, canvas, objects, maps, sets 和 images.

## 用法

```ts
import { Ref, ref } from 'vue'
import { useBase64 } from '@vueuse/core'

const text = ref('')

const { base64 } = useBase64(text)
```

如果你使用对象、数组、Map或Set，你可以在选项中提供序列化器。否则，你的数据将使用默认的序列化器进行序列化。
对象和数组将通过 JSON.stringify 转换为字符串。Map和Set将在转换为对象和数组之后再进行字符串化。
