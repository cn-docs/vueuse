---
category: Sensors
---

# useNetwork

响应式地获取 [网络状态](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)。网络信息 API 提供了有关系统连接的信息，例如一般连接类型（例如，“wifi”，“cellular”等）。这可以用于根据用户的连接选择高清晰度内容或低清晰度内容。整个 API 由 NetworkInformation 接口的添加和 Navigator 接口的单个属性组成：Navigator.connection。

## 使用方法

```js
import { useNetwork } from '@vueuse/core'

const { isOnline, offlineAt, downlink, downlinkMax, effectiveType, saveData, type } = useNetwork()

console.log(isOnline.value)
```

要将其作为对象使用，请使用 `reactive()` 进行包装

```js
import { reactive } from 'vue'

const network = reactive(useNetwork())

console.log(network.isOnline)
```

## 组件使用

```vue
<template>
  <UseNetwork v-slot="{ isOnline, type }">
    是否在线：{{ isOnline }} 类型：{{ type }}
  </UseNetwork>
</template>
```
