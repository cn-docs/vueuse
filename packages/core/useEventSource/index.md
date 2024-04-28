---
category: Network
---

# useEventSource

一个 [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) 或 [Server-Sent-Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) 实例打开了与 HTTP 服务器的持久连接，服务器以 text/event-stream 格式发送事件。

## 用法

```js
import { useEventSource } from '@vueuse/core'

const { status, data, error, close } = useEventSource('https://event-source-url')
```

查看 [类型声明](#type-declarations) 以获取更多选项。

### 命名事件

你可以使用第二个参数定义命名事件

```ts
import { useEventSource } from '@vueuse/core'

const { event, data } = useEventSource('https://event-source-url', ['notice', 'update'] as const)
```

### 立即连接

自动连接（默认启用）。

这将自动为您调用 `open()`，您无需自行调用它。

如果 URL 作为一个 ref 提供，这也控制了在其值更改时是否重新建立连接（或者是否需要再次调用 open() 才能生效）。

### 自动重连

自动在发生错误时重新连接（默认禁用）。

```ts
const { status, data, close } = useEventSource('https://event-source-url', [], {
  autoReconnect: true,
})
```

或者使用更多对其行为的控制：

```ts
const { status, data, close } = useEventSource('https://event-source-url', [], {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('重试 3 次后无法连接 EventSource')
    },
  },
})
```
