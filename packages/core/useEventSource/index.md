---
category: Network
---

# useEventSource

[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) 或 [Server-Sent-Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) 实例打开与 HTTP 服务器的持久连接，该服务器以 text/event-stream 格式发送事件。

## 用法

```js
import { useEventSource } from '@vueuse/core'

const { status, data, error, close } = useEventSource('https://event-source-url')
```

查看 [类型声明](#type-declarations) 获取更多选项。

### 命名事件

你可以使用第二个参数定义命名事件：

```ts
import { useEventSource } from '@vueuse/core'

const { event, data } = useEventSource('https://event-source-url', ['notice', 'update'] as const)
```

### immediate

默认启用。

在调用组合式函数时立即建立连接。

### autoConnect

默认启用。

如果 url 作为 ref 提供，当 url 更改时，它将自动重新连接到新的 url。

### 错误时自动重连

在错误时自动重连（默认禁用）。

```js
const { status, data, close } = useEventSource('https://event-source-url', [], {
  autoReconnect: true,
})
```

或者对其行为进行更多控制：

```js
const { status, data, close } = useEventSource('https://event-source-url', [], {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('在 3 次重试后连接 EventSource 失败')
    },
  },
})
```
