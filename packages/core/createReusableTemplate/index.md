---
category: Component
outline: deep
---

# createReusableTemplate

在组件作用域内定义和重用模板。

## 动机

通常需要重用模板的某些部分。例如：

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

我们希望尽可能多地重用代码。所以通常我们可能需要将这些重复的部分提取到一个组件中。然而，在一个分离的组件中，你会失去访问本地绑定的能力。为它们定义 props 和 emits 有时会很繁琐。

因此，这个函数被创建来提供一种在组件作用域内定义和重用模板的方法。

## 用法

在前面的例子中，我们可以这样重构：

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

- `<DefineTemplate>` 将注册模板并且不渲染任何内容。
- `<ReuseTemplate>` 将渲染由 `<DefineTemplate>` 提供的模板。
- `<DefineTemplate>` 必须在 `<ReuseTemplate>` 之前使用。

> **注意**：建议尽可能将其提取为单独的组件。滥用此函数可能会导致代码库的不良实践。

### Options API

当使用 [Options API](https://vuejs.org/guide/introduction.html#api-styles) 时，你需要在组件设置之外定义 `createReusableTemplate` 并将其传递给 `components` 选项，以便在模板中使用它们。

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

- 使用 `v-slot="..."` 在 `<DefineTemplate>` 上访问数据
- 直接在 `<ReuseTemplate>` 上绑定数据以将它们传递给模板

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

// 提供一对 `DefineTemplate` 和 `ReuseTemplate`
const [DefineFoo, ReuseFoo] = createReusableTemplate<{ msg: string }>()

// 你可以创建多个可重用模板
const [DefineBar, ReuseBar] = createReusableTemplate<{ items: string[] }>()
</script>

<template>
  <DefineFoo v-slot="{ msg }">
    <!-- `msg` 被类型化为 `string` -->
    <div>你好 {{ msg.toUpperCase() }}</div>
  </DefineFoo>

  <ReuseFoo msg="世界" />

  <!-- @ts-expect-error 类型错误！ -->
  <ReuseFoo :msg="1" />
</template>
```

可选地，如果你不喜欢数组解构，以下用法也是合法的：

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const { define: DefineFoo, reuse: ReuseFoo } = createReusableTemplate<{
  msg: string
}>()
</script>

<template>
  <DefineFoo v-slot="{ msg }">
    <div>你好 {{ msg.toUpperCase() }}</div>
  </DefineFoo>

  <ReuseFoo msg="世界" />
</template>
```

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const TemplateFoo = createReusableTemplate<{ msg: string }>()
</script>

<template>
  <TemplateFoo.define v-slot="{ msg }">
    <div>你好 {{ msg.toUpperCase() }}</div>
  </TemplateFoo.define>

  <TemplateFoo.reuse msg="世界" />
</template>
```

::: warning
不支持不带 `v-bind` 的布尔属性。请参阅 [注意事项](#boolean-props) 部分了解更多详情。
:::

### Props 和 Attributes

默认情况下，传递给 `<ReuseTemplate>` 的所有 props 和 attributes 都会传递给模板。如果你不希望某些 props 传递给 DOM，你需要定义运行时 props：

```ts
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate({
  props: {
    msg: String,
    enable: Boolean,
  }
})
```

如果你不想将任何 props 传递给模板，你可以传递 `inheritAttrs` 选项：

```ts
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate({
  inheritAttrs: false,
})
```

### 传递插槽

也可以从 `<ReuseTemplate>` 传递插槽。你可以从 `$slots` 在 `<DefineTemplate>` 上访问插槽：

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
    <div>其他内容</div>
  </ReuseTemplate>
</template>
```

## 注意事项

### 布尔属性

与 Vue 的行为相反，定义为 `boolean` 的属性，如果没有使用 `v-bind` 传递或缺失，将分别解析为空字符串或 `undefined`：

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

此函数是从 [vue-reuse-template](https://github.com/antfu/vue-reuse-template) 迁移而来。

关于重用模板的现有 Vue 讨论/问题：

- [关于重用模板的讨论](https://github.com/vuejs/core/discussions/6898)

替代方案：

- [Vue Macros - `namedTemplate`](https://vue-macros.sxzz.moe/features/named-template.html)
- [`unplugin-vue-reuse-template`](https://github.com/liulinboyi/unplugin-vue-reuse-template)
