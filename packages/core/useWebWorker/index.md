---
category: Browser
related: useWebWorkerFn
---

# useWebWorker

简单的[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)注册和通信。

## Usage

```js
import { useWebWorker } from '@vueuse/core'

const { data, post, terminate, worker } = useWebWorker('/path/to/worker.js')
```

| 状态   | 类型                              | 描述                                                       |
| ------ | --------------------------------- | ---------------------------------------------------------- |
| data   | `Ref<any>`                        | 对通过 worker 接收的最新数据的引用，可以监视以响应传入消息 |
| worker | `ShallowRef<Worker \| undefined>` | 对 WebWorker 实例的引用                                    |

| 方法      | 签名                                                                                                                          | 描述                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| post      | `(message: any, transfer: Transferable[]): void`<br>`(message: any, options?: StructuredSerializeOptions \| undefined): void` | 发送数据到工作线程。 |
| terminate | `() => void`                                                                                                                  | 停止并终止工作线程。 |
