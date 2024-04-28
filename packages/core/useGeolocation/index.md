---
category: Sensors
---

# useGeolocation

提供响应式的[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)。如果用户愿意，它允许用户向 Web 应用程序提供其位置。出于隐私原因，用户需要获得报告位置信息的权限。

## 使用方法

```js
import { useGeolocation } from '@vueuse/core'

const { coords, locatedAt, error, resume, pause } = useGeolocation()
```

| 状态      | 类型                                                                          | 描述                                    |
| --------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| coords    | [`Coordinates`](https://developer.mozilla.org/en-US/docs/Web/API/Coordinates) | 获取的位置信息，如纬度和经度            |
| locatedAt | `Date`                                                                        | 最后一次地理定位的时间                  |
| error     | `string`                                                                      | 如果地理定位 API 失败，则显示错误消息。 |
| resume    | `function`                                                                    | 控制函数，用于恢复更新地理定位。        |
| pause     | `function`                                                                    | 控制函数，用于暂停更新地理定位。        |

## 配置

`useGeolocation` 函数可以接受 [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) 对象作为可选参数。

## 组件使用

```vue
<template>
  <UseGeolocation v-slot="{ coords: { latitude, longitude } }">
    纬度：{{ latitude }} 经度：{{ longitude }}
  </UseGeolocation>
</template>
```
