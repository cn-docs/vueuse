---
category: Sensors
---

# useIdle

跟踪用户是否处于不活动状态。

## 使用方法

```js
import { useIdle } from '@vueuse/core'

const { idle, lastActive } = useIdle(5 * 60 * 1000) // 5 分钟

console.log(idle.value) // true 或 false
```

程序化重置：

```js
import { watch } from 'vue'
import { useCounter, useIdle } from '@vueuse/core'

const { inc, count } = useCounter()

const { idle, lastActive, reset } = useIdle(5 * 60 * 1000) // 5 分钟

watch(idle, (idleValue) => {
  if (idleValue) {
    inc()
    console.log(`触发了 ${count.value} 次`)
    reset() // 重新启动空闲计时器。不会更改 lastActive 值
  }
})
```

## 组件使用

```vue
<template>
  <UseIdle v-slot="{ idle }" :timeout="5 * 60 * 1000">
    是否空闲：{{ idle }}
  </UseIdle>
</template>
```
