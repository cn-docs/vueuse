---
category: Sensors
---

# useSpeechRecognition

响应式 [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)。

> [Can I use?](https://caniuse.com/mdn-api_speechrecognitionevent)

## 用法

```ts
import { useSpeechRecognition } from '@vueuse/core'

const {
  isSupported,
  isListening,
  isFinal,
  result,
  start,
  stop,
} = useSpeechRecognition()
```

### 选项

以下显示了选项的默认值，它们将直接传递给 [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)。

```ts
useSpeechRecognition({
  lang: 'en-US',
  interimResults: true,
  continuous: true,
})
```
