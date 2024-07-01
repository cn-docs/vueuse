---
category: Component
outline: deep
---

# createTemplatePromise

将模板作为 Promise。适用于构建自定义对话框、模态框、提示框等。

::: warning
此函数仅适用于 Vue 3。
:::

## 使用方法

```vue
<script setup lang="ts">
import { createTemplatePromise } from '@vueuse/core'

const TemplatePromise = createTemplatePromise()

async function open() {
  const result = await TemplatePromise.start()
  // 按钮被点击后，result 为 'ok'
}
</script>

<template>
  <TemplatePromise v-slot="{ promise, resolve, reject, args }">
    <!-- 您的 UI -->
    <button @click="resolve('ok')">
      确定
    </button>
  </TemplatePromise>
</template>
```

## 特性

- **编程式调用** - 将您的 UI 作为 Promise 调用
- **模板** - 使用 Vue 模板进行渲染，而不是新的 DSL
- **TypeScript** - 通过泛型类型实现完整的类型安全性
- **无渲染** - 您完全控制 UI
- **过渡** - 使用支持的 Vue 过渡

此功能是从 [vue-template-promise](https://github.com/antfu/vue-template-promise) 迁移而来。

## 使用方法

`createTemplatePromise` 返回一个**Vue 组件**，您可以直接在模板中使用 `<script setup>`。

```ts
import { createTemplatePromise } from '@vueuse/core'

const TemplatePromise = createTemplatePromise()
const MyPromise = createTemplatePromise<boolean>() // 使用泛型类型
```

在模板中，使用 `v-slot` 来访问 Promise 和 resolve 函数。

```vue
<template>
  <TemplatePromise v-slot="{ promise, resolve, reject, args }">
    <!-- 您可以放置任何内容 -->
    <button @click="resolve('ok')">
      确定
    </button>
  </TemplatePromise>
  <MyPromise v-slot="{ promise, resolve, reject, args }">
    <!-- 另一个示例 -->
  </MyPromise>
</template>
```

插槽最初不会被渲染（类似于 `v-if="false"`），直到您从组件中调用 `start` 方法。

```ts
const result = await TemplatePromise.start()
```

一旦在模板中调用了 `resolve` 或 `reject`，Promise 将被解决或拒绝，并返回您传递的值。一旦解决，插槽将自动移除。

### 传递参数

您可以通过参数将参数传递给 `start`。

```ts
import { createTemplatePromise } from '@vueuse/core'

const TemplatePromise = createTemplatePromise<boolean, [string, number]>()
```

```ts
const result = await TemplatePromise.start('hello', 123) // Pr
```

在模板插槽中，您可以通过 `args` 属性访问参数。

```vue
<template>
  <TemplatePromise v-slot="{ args, resolve }">
    <div>{{ args[0] }}</div>
    <!-- hello -->
    <div>{{ args[1] }}</div>
    <!-- 123 -->
    <button @click="resolve(true)">
      确定
    </button>
  </TemplatePromise>
</template>
```

### 过渡

您可以使用过渡来为插槽添加动画效果。

```vue
<script setup lang="ts">
const TemplatePromise = createTemplatePromise<ReturnType>({
  transition: {
    name: 'fade',
    appear: true,
  },
})
</script>

<template>
  <TemplatePromise v-slot="{ resolve }">
    <!-- 您的 UI -->
    <button @click="resolve('ok')">
      确定
    </button>
  </TemplatePromise>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

了解更多关于 [Vue 过渡](https://vuejs.org/guide/built-ins/transition.html)。

## 动机

以编程方式调用对话框或模型的常见方法如下：

```ts
const dialog = useDialog()
const result = await dialog.open({
  title: 'Hello',
  content: 'World',
})
```

通过将这些信息发送到顶层组件并让其渲染对话框，这种方法可以工作。然而，它限制了您可以在 UI 中表达的灵活性。例如，您可能希望标题是红色的，或者有额外的按钮等。您可能会得到很多选项，如：

```ts
const result = await dialog.open({
  title: 'Hello',
  titleClass: 'text-red',
  content: 'World',
  contentClass: 'text-blue text-sm',
  buttons: [
    { text: '确定', class: 'bg-red', onClick: () => {} },
    { text: '取消', class: 'bg-blue', onClick: () => {} },
  ],
  // ...
})
```

即使这样也不够灵活。如果您想要更多，您可能最终会得到手动渲染函数。

```ts
const result = await dialog.open({
  title: 'Hello',
  contentSlot: () => h(MyComponent, { content }),
})
```

这就像在脚本中重新发明一个新的 DSL 来表达 UI 模板。

因此，这个函数允许**在模板中表达 UI 而不是脚本**，这是它应该在的地方，同时仍然能够以编程方式进行操作。
