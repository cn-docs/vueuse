---
category: Sensors
---

# useMouse

鼠标位置的响应式状态

## 基本用法

```ts twoslash
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
```

默认情况下启用了触摸功能。要仅检测鼠标变化，请将 `touch` 设置为 `false`。
`dragover` 事件用于跟踪拖动时的鼠标位置。

```ts twoslash
import { useMouse } from '@vueuse/core'
// ---cut---
const { x, y } = useMouse({ touch: false })
```

## 自定义提取器

还可以提供自定义提取器函数来从事件中获取位置信息。

```ts twoslash
import type { UseMouseEventExtractor } from '@vueuse/core'
import { useMouse, useParentElement } from '@vueuse/core'

const parentEl = useParentElement()

const extractor: UseMouseEventExtractor = event => (
  event instanceof MouseEvent
    ? [event.offsetX, event.offsetY]
    : null
)

const { x, y, sourceType } = useMouse({ target: parentEl, type: extractor })
```

## 组件使用

```vue
<template>
  <UseMouse v-slot="{ x, y }">
    x: {{ x }}
    y: {{ y }}
  </UseMouse>
</template>
```
