---
category: Browser
---

# useGamepad

提供了[Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)的响应式绑定。

## 使用方法

> 由于Gamepad API的工作方式，您必须使用游戏手柄与页面进行交互，然后才能检测到它。

```vue
<script setup>
import { computed } from 'vue'
import { useGamepad } from '@vueuse/core'

const { isSupported, gamepads } = useGamepad()
const gamepad = computed(() => gamepads.find(g => g.mapping === 'standard'))
</script>

<template>
  <span>
    {{ gamepad.id }}
  </span>
</template>
```

### 游戏手柄更新

目前，Gamepad API没有事件支持来更新游戏手柄的状态。为了更新游戏手柄的状态，使用`requestAnimationFrame`来轮询游戏手柄的变化。您可以通过使用`useGamepad`提供的`pause`和`resume`函数来控制此轮询。

```ts
import { useGamepad } from '@vueuse/core'

const { pause, resume, gamepads } = useGamepad()

pause()

// 游戏手柄对象不会更新

resume()

// 游戏手柄对象将在用户输入时更新
```

### 游戏手柄连接和断开事件

当游戏手柄连接或断开连接时，`onConnected`和`onDisconnected`事件将触发。

```ts
const { gamepads, onConnected, onDisconnected } = useGamepad()

onConnected((index) => {
  console.log(`${gamepads.value[index].id} connected`)
})

onDisconnected((index) => {
  console.log(`${index} disconnected`)
})
```

### 振动

> 游戏手柄触觉 API 的支持不完整，请在使用之前检查[兼容性表](https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator#browser_compatibility)。

```ts
import { computed } from 'vue'

const supportsVibration = computed(() => gamepad.hapticActuators.length > 0)
function vibrate() {
  if (supportsVibration.value) {
    const actuator = gamepad.hapticActuators[0]
    actuator.playEffect('dual-rumble', {
      startDelay: 0,
      duration: 1000,
      weakMagnitude: 1,
      strongMagnitude: 1,
    })
  }
}
```

### 映射

为了使Gamepad API更易于使用，我们提供了映射来将控制器映射到控制器的按钮布局。

#### Xbox360 控制器

```vue
<script setup>
import { mapGamepadToXbox360Controller } from '@vueuse/core'

const controller = mapGamepadToXbox360Controller(gamepad)
</script>

<template>
  <span>{{ controller.buttons.a.pressed }}</span>
  <span>{{ controller.buttons.b.pressed }}</span>
  <span>{{ controller.buttons.x.pressed }}</span>
  <span>{{ controller.buttons.y.pressed }}</span>
</template>
```

目前只有Xbox 360 控制器的映射。如果您有要添加映射的控制器，请随时为更多控制器映射打开 PR！
