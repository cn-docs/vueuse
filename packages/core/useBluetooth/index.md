---
category: Browser
---

# useBluetooth

响应式的 [Web 蓝牙 API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)。提供与蓝牙低功耗外围设备连接和交互的能力。

Web 蓝牙 API 允许网站使用通用属性配置文件 (GATT) 在蓝牙 4 无线标准上发现和通信设备。

注意：它目前在 Android M、Chrome OS、Mac 和 Windows 10 中部分实现。有关浏览器兼容性的完整概述，请参阅 [Web 蓝牙 API 浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility)。

注意：关于 Web 蓝牙 API 规范，有一些需要注意的事项。请参阅 [Web 蓝牙 W3C 草案报告](https://webbluetoothcg.github.io/web-bluetooth/) 以获取关于设备检测和连接的众多注意事项。

注意：此 API 在 Web Workers 中不可用（不通过 WorkerNavigator 暴露）。

## 默认用法

```ts
import { useBluetooth } from '@vueuse/core'

const {
  isSupported,
  isConnected,
  device,
  requestDevice,
  server,
} = useBluetooth({
  acceptAllDevices: true,
})
```

```vue
<template>
  <button @click="requestDevice()">
    请求蓝牙设备
  </button>
</template>
```

当设备已配对并连接时，您可以自由地使用 server 对象。

## 电池电量示例用法

此示例演示了使用 Web 蓝牙 API 读取电池电量并从附近的蓝牙低功耗设备接收更改通知的方法。

在此示例中，我们使用 `characteristicvaluechanged` 事件侦听器来处理读取电池电量特征值。此事件侦听器还将选择性地处理即将到来的通知。

```ts
import { pausableWatch, useBluetooth } from '@vueuse/core'

const {
  isSupported,
  isConnected,
  device,
  requestDevice,
  server,
} = useBluetooth({
  acceptAllDevices: true,
  optionalServices: [
    'battery_service',
  ],
})

const batteryPercent = ref<undefined | number>()

const isGettingBatteryLevels = ref(false)

async function getBatteryLevels() {
  isGettingBatteryLevels.value = true

  // Get the battery service:
  const batteryService = await server.getPrimaryService('battery_service')

  // Get the current battery level
  const batteryLevelCharacteristic = await batteryService.getCharacteristic(
    'battery_level',
  )

  // Listen to when characteristic value changes on `characteristicvaluechanged` event:
  batteryLevelCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
    batteryPercent.value = event.target.value.getUint8(0)
  })

  // Convert received buffer to number:
  const batteryLevel = await batteryLevelCharacteristic.readValue()

  batteryPercent.value = await batteryLevel.getUint8(0)
}

const { stop } = pausableWatch(isConnected, (newIsConnected) => {
  if (!newIsConnected || !server.value || isGettingBatteryLevels.value)
    return
  // Attempt to get the battery levels of the device:
  getBatteryLevels()
  // We only want to run this on the initial connection, as we will use an event listener to handle updates:
  stop()
})
```

```vue
<template>
  <button @click="requestDevice()">
    请求蓝牙设备
  </button>
</template>
```

更多示例可以在 [Google Chrome 的 Web 蓝牙示例](https://googlechrome.github.io/samples/web-bluetooth/) 中找到。
