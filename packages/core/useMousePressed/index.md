---
category: Sensors
---

# useMousePressed

响应式的鼠标按下状态。在目标元素上通过 `mousedown` `touchstart` 触发，在窗口上通过 `mouseup` `mouseleave` `touchend` `touchcancel` 释放。

## 基本用法

```js
import { useMousePressed } from '@vueuse/core'

const { pressed } = useMousePressed()
```

默认启用触摸。要使其仅检测鼠标变化，将 `touch` 设置为 `false`：

```js
const { pressed } = useMousePressed({ touch: false })
```

要仅在特定元素上捕获 `mousedown` 和 `touchstart`，你可以通过传递元素的 ref 来指定 `target`。

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLDivElement>('el')

const { pressed } = useMousePressed({ target: el })
</script>

<template>
  <div ref="el">
    只有点击此元素才会触发更新。
  </div>
</template>
```

## 组件用法

```vue
<template>
  <UseMousePressed v-slot="{ pressed }">
    是否按下: {{ pressed }}
  </UseMousePressed>
</template>
```
