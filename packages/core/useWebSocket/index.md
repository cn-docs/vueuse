---
category: Network
---

# useWebSocket

响应式的 [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) 客户端。

## 用法

```js
import { useWebSocket } from '@vueuse/core'

const { status, data, send, open, close } = useWebSocket('ws://websocketurl')
```

查看 [类型声明](#type-declarations) 获取更多选项。

### immediate

默认启用。

在调用组合式函数时立即建立连接。

### autoConnect

默认启用。

如果 url 作为 ref 提供，当 url 更改时，它将自动重新连接到新的 url。

### autoClose

默认启用。

这将在触发 `beforeunload` 事件或关联的效果作用域停止时自动调用 `close()`。

### autoReconnect

在错误时自动重连（默认禁用）。

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  autoReconnect: true,
})
```

或者对其行为进行更多控制：

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('在 3 次重试后连接 WebSocket 失败')
    },
  },
})
```

显式调用 `close()` 不会触发自动重连。

### heartbeat

通常的做法是每隔一段时间发送一个小消息（心跳）以保持连接活跃。在这个函数中，我们提供了一个方便的辅助函数来实现这一点：

```js
const { status, data, close } = useWebSocket('ws://websocketurl', {
  heartbeat: true,
})
```

或者进行更多控制：

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

要使用的子协议列表，在这个例子中是 soap 和 wamp。

```js
import { useWebSocket } from '@vueuse/core'

const { status, data, send, open, close } = useWebSocket('ws://websocketurl', {
  protocols: ['soap'], // ['soap', 'wamp']
})
```
