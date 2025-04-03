---
category: Reactivity
alias: autoResetRef
---

# refAutoReset

一个在一段时间后将重置为默认值的 ref。

## 用法

```ts
import { refAutoReset } from '@vueuse/core'

const message = refAutoReset('默认消息', 1000)

function setMessage() {
  // 在这里，值将会变为 '消息已设置'，但是 1000 毫秒后，它将会变回 '默认消息'
  message.value = '消息已设置'
}
```

::: info
You can use `triggerRef` to trigger effects after making deep mutations to the inner value of a refAutoReset.
:::
