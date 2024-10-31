---
category: Browser
---

# useBroadcastChannel

响应式 [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)。

在组件卸载时自动关闭广播频道。

## 使用方法

BroadcastChannel 接口表示一个命名的频道，同一来源的任何浏览上下文都可以订阅它。它允许不同文档（在不同窗口、选项卡、框架或 iframe 中）之间进行通信。

消息通过在所有监听频道的 BroadcastChannel 对象上触发的消息事件进行广播。

```js
import { useBroadcastChannel } from '@vueuse/core'
import { ref } from 'vue'

const {
  isSupported,
  channel,
  post,
  close,
  error,
  isClosed,
} = useBroadcastChannel({ name: 'vueuse-demo-channel' })

const message = ref('')

message.value = 'Hello, VueUse World!'

// 将消息发布到广播频道：
post(message.value)

// 关闭频道：
close()
```
