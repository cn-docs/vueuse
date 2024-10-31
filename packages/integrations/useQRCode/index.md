---
category: '@Integrations'
---

# useQRCode

[`qrcode`](https://github.com/soldair/node-qrcode) 的封装。

## 安装

```bash
npm i qrcode@^1
```

## 使用方法

```ts
import { useQRCode } from '@vueuse/integrations/useQRCode'

// `qrcode` 将是一个数据 URL 的 ref
const qrcode = useQRCode('要编码的文本')
```

或者将一个 `ref` 传递给它，返回的数据 URL ref 将随着源 ref 的更改而改变。

```ts
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { ref } from 'vue'

const text = ref('要编码的文本')
const qrcode = useQRCode(text)
```

```html
<input v-model="text" type="text" />
<img :src="qrcode" alt="QR Code" />
```
