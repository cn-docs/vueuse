---
category: Sensors
---

# useMousePressed

鼠标按下状态的响应式状态。在目标元素上触发 `mousedown` `touchstart`，在窗口上释放 `mouseup` `mouseleave` `touchend` `touchcancel`。

## 基本用法

```js
import { useMousePressed } from '@vueuse/core'

const { pressed } = useMousePressed()
```

默认情况下启用触摸。要使其仅检测鼠标变化，将 `touch` 设置为 `false`

```js
const { pressed } = useMousePressed({ touch: false })
```

要仅捕获特定元素上的 `mousedown` 和 `touchstart`，可以通过传递元素的 ref 来指定 `target`。

```vue
<script>
const el = ref(null)

const { pressed } = useMousePressed({ target: el })
</script>

<template>
  <div ref="el">
    仅点击此元素将触发更新。
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
