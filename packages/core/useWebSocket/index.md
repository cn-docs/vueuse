---
category: Network
---

# useWebSocket

响应式 [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) 客户端。

## 用法

```js
import { useWebSocket } from '@vueuse/core'

const { status, data, send, open, close } = useWebSocket('ws://websocketurl')
```

有关更多选项，请参阅[类型声明](#type-declarations)。

### 立即连接

自动连接（默认启用）。

这将自动为您调用 `open()`，您不需要自己调用它。

如果 URL 作为 ref 提供，则它还控制在其值更改时是否重新建立连接（或者您需要再次调用 open() 以使更改生效）。

### 自动关闭连接

自动关闭连接（默认启用）。

当触发 `beforeunload` 事件或关联的 effect 范围停止时，这将自动调用 `close()`。

### 自动重连

在错误发生时自动重连（默认禁用）。

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  autoReconnect: true,
})
```

或者具有更多控制其行为的选项：

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('重试 3 次后无法连接 WebSocket')
    },
  },
})
```

显式调用 `close()` 不会触发自动重新连接。

### 心跳

通常会在每隔一段时间发送一个小消息（心跳）以保持连接活动状态。在此函数中，我们提供了一个便利的辅助工具来执行此操作：

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  heartbeat: true,
})
```

或者具有更多控制：

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  heartbeat: {
    message: 'ping',
    interval: 1000,
    pongTimeout: 1000,
  },
})
```

### 子协议

要使用的一个或多个子协议列表，在这种情况下是 soap 和 wamp。

```js
import { useWebSocket } from '@vueuse/core'

const { status, data, send, open, close } = useWebSocket('ws://websocketurl', {
  protocols: ['soap'], // ['soap', 'wamp']
})
```
