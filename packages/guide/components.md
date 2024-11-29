# 组件

在 v5.0 中，我们引入了一个新的包，`@vueuse/components`，提供了无渲染组件版本的可组合函数。

## 安装

```bash
npm i @vueuse/core @vueuse/components
```

## 使用

例如，对于 `onClickOutside`，不再需要为函数绑定组件引用：

```vue
<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const el = ref()

function close() {
  /* ... */
}

onClickOutside(el, close)
</script>

<template>
  <div ref="el">
    Click Outside of Me
  </div>
</template>
```

我们现在可以使用自动绑定的无渲染组件：

```vue
<script setup>
import { OnClickOutside } from '@vueuse/components'

function close() {
  /* ... */
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <div>
      Click Outside of Me
    </div>
  </OnClickOutside>
</template>
```

## 返回值

您可以使用 `v-slot` 访问返回值。

```vue
<template>
  <UseMouse v-slot="{ x, y }">
    x: {{ x }}
    y: {{ y }}
  </UseMouse>
</template>
```

```vue
<template>
  <UseDark v-slot="{ isDark, toggleDark }">
    <button @click="toggleDark()">
      Is Dark: {{ isDark }}
    </button>
  </UseDark>
</template>
```

请参考每个函数的文档以了解组件样式的详细用法。
