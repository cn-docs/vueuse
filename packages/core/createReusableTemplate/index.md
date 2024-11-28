---
category: Component
outline: deep
---

# createReusableTemplate

在组件作用域内定义和重用模板。

## 动机

在开发中经常需要重用模板的某些部分。例如：

```vue
<template>
  <dialog v-if="showInDialog">
    <!-- 一些复杂的内容 -->
  </dialog>
  <div v-else>
    <!-- 一些复杂的内容 -->
  </div>
</template>
```

我们希望尽可能地重用代码。通常我们需要将这些重复的部分提取到一个组件中。但是，在独立的组件中，你会失去访问局部绑定的能力。为它们定义 props 和 emits 有时会很繁琐。

因此，这个函数的目的是提供一种在组件作用域内定义和重用模板的方法。

## 使用方法

在上面的例子中，我们可以这样重构：

```vue
<script setup>
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <!-- 一些复杂的内容 -->
  </DefineTemplate>

  <dialog v-if="showInDialog">
    <ReuseTemplate />
  </dialog>
  <div v-else>
    <ReuseTemplate />
  </div>
</template>
```

- `<DefineTemplate>` 将注册模板但不渲染任何内容。
- `<ReuseTemplate>` 将渲染由 `<DefineTemplate>` 提供的模板。
- `<DefineTemplate>` 必须在 `<ReuseTemplate>` 之前使用。

> **注意**：建议尽可能将内容提取为独立组件。过度使用此函数可能会导致代码库的不良实践。

### 选项式 API

当使用[选项式 API](https://vuejs.org/guide/introduction.html#api-styles)时，你需要在组件设置之外定义 `createReusableTemplate`，并将其传递给 `components` 选项以在模板中使用。

```vue
<script>
import { createReusableTemplate } from '@vueuse/core'
import { defineComponent } from 'vue'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

export default defineComponent({
  components: {
    DefineTemplate,
    ReuseTemplate,
  },
  setup() {
    // ...
  },
})
</script>

<template>
  <DefineTemplate v-slot="{ data, msg, anything }">
    <div>{{ data }} 从使用处传递</div>
  </DefineTemplate>

  <ReuseTemplate :data="data" msg="第一次使用" />
</template>
```

### 传递数据

你也可以使用插槽向模板传递数据：

- 在 `<DefineTemplate>` 上使用 `v-slot="..."` 来访问数据
- 直接在 `<ReuseTemplate>` 上绑定数据以传递给模板

```vue
<script setup>
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate v-slot="{ data, msg, anything }">
    <div>{{ data }} 从使用处传递</div>
  </DefineTemplate>

  <ReuseTemplate :data="data" msg="第一次使用" />
  <ReuseTemplate :data="anotherData" msg="第二次使用" />
  <ReuseTemplate v-bind="{ data: something, msg: '第三次' }" />
</template>
```

### TypeScript 支持

`createReusableTemplate` 接受一个泛型类型来为传递给模板的数据提供类型支持：

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

// 返回一对 `DefineTemplate` 和 `ReuseTemplate`
const [DefineFoo, ReuseFoo] = createReusableTemplate<{ msg: string }>()

// 你可以创建多个可重用模板
const [DefineBar, ReuseBar] = createReusableTemplate<{ items: string[] }>()
</script>

<template>
  <DefineFoo v-slot="{ msg }">
    <!-- `msg` 的类型为 `string` -->
    <div>Hello {{ msg.toUpperCase() }}</div>
  </DefineFoo>

  <ReuseFoo msg="World" />

  <!-- @ts-expect-error 类型错误！ -->
  <ReuseFoo :msg="1" />
</template>
```

如果你不喜欢数组解构，以下用法也是合法的：

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const { define: DefineFoo, reuse: ReuseFoo } = createReusableTemplate<{
  msg: string
}>()
</script>

<template>
  <DefineFoo v-slot="{ msg }">
    <div>Hello {{ msg.toUpperCase() }}</div>
  </DefineFoo>

  <ReuseFoo msg="World" />
</template>
```

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const TemplateFoo = createReusableTemplate<{ msg: string }>()
</script>

<template>
  <TemplateFoo.define v-slot="{ msg }">
    <div>Hello {{ msg.toUpperCase() }}</div>
  </TemplateFoo.define>

  <TemplateFoo.reuse msg="World" />
</template>
```

::: warning
不支持在没有 `v-bind` 的情况下传递布尔类型的 props。详见[注意事项](#布尔类型-props)部分。
:::

### 传递插槽

也可以从 `<ReuseTemplate>` 传回插槽。你可以通过 `$slots` 在 `<DefineTemplate>` 上访问这些插槽：

```vue
<script setup>
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate v-slot="{ $slots, otherProp }">
    <div some-layout>
      <!-- 渲染插槽 -->
      <component :is="$slots.default" />
    </div>
  </DefineTemplate>

  <ReuseTemplate>
    <div>一些内容</div>
  </ReuseTemplate>
  <ReuseTemplate>
    <div>另一些内容</div>
  </ReuseTemplate>
</template>
```

## 注意事项

### 布尔类型 props

与 Vue 的行为不同，定义为 `boolean` 类型的 props 在没有 `v-bind` 传递或缺失时会分别解析为空字符串或 `undefined`：

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  value?: boolean
}>()
</script>

<template>
  <DefineTemplate v-slot="{ value }">
    {{ typeof value }}: {{ value }}
  </DefineTemplate>

  <ReuseTemplate :value="true" />
  <!-- boolean: true -->

  <ReuseTemplate :value="false" />
  <!-- boolean: false -->

  <ReuseTemplate value />
  <!-- string: -->

  <ReuseTemplate />
  <!-- undefined: -->
</template>
```

## 参考

此函数从 [vue-reuse-template](https://github.com/antfu/vue-reuse-template) 迁移而来。

关于重用模板的现有 Vue 讨论/问题：

- [关于重用模板的讨论](https://github.com/vuejs/core/discussions/6898)

替代方案：

- [Vue Macros - `namedTemplate`](https://vue-macros.sxzz.moe/features/named-template.html)
- [`unplugin-@vueuse/core`](https://github.com/liulinboyi/unplugin-@vueuse/core)
