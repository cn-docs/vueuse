---
category: Browser
---

# useWebWorkerFn

使用简单的语法，在不阻塞UI的情况下运行昂贵的函数，使用Promise。这是 [alewin/useWorker](https://github.com/alewin/useWorker) 的一个端口。

## 用法

### 基本示例

```js
import { useWebWorkerFn } from '@vueuse/core'

const { workerFn } = useWebWorkerFn(() => {
  // 在 Web Worker 中执行一些繁重的工作
})
```

### 带有依赖项

```ts {7-9}
import { useWebWorkerFn } from '@vueuse/core'

const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn(
  dates => dates.sort(dateFns.compareAsc),
  {
    timeout: 50000,
    dependencies: [
      'https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js', // dateFns
    ],
  },
)
```

### With local dependencies

```ts {9-9}
import { useWebWorkerFn } from '@vueuse/core'

const pow = (a: number) => a * a

const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn(
  numbers => pow(numbers),
  {
    timeout: 50000,
    localDependencies: [pow]
  },
)
```

## Web Worker

在开始使用此函数之前，我们建议您阅读 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) 文档。

## 鸣谢

此函数是 Alessio Koci 的 [useWorker](https://github.com/alewin/useWorker) 的一个 Vue 端口，得到了 [@Donskelle](https://github.com/Donskelle) 的帮助进行迁移。
