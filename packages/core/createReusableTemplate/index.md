---
category: Component
outline: deep
---

# createReusableTemplate

在组件作用域内定义并复用模板。

## 动机

在开发中，经常有复用模板部分的需求。例如：

```vue
<template>
  <dialog v-if="showInDialog">
    <!-- 复杂内容 -->
  </dialog>
  <div v-else>
    <!-- 复杂内容 -->
  </div>
</template>
```

我们希望尽可能多地复用代码。通常，我们会将这些重复的部分提取到一个独立的组件中。然而，在分离的组件中，你失去了直接访问局部绑定的能力。为它们定义props和emits有时会显得繁琐。

因此，这个函数提供了一种方式，在组件内部定义并复用模板。

## 使用方法

针对上述示例，我们可以这样重构：

```vue
<script setup>
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <!-- 复杂内容 -->
  </DefineTemplate>

  <dialog v-if="showInDialog">
    <ReuseTemplate />
  </dialog>
  <div v-else>
    <ReuseTemplate />
  </div>
</template>
```

- `<DefineTemplate>`用于注册模板，但本身不渲染任何内容。
- `<ReuseTemplate>`则用来展示由`<DefineTemplate>`提供的模板。
- `<DefineTemplate>`必须在`<ReuseTemplate>`之前使用。

> **注意**：尽可能将逻辑提取为独立组件是推荐的做法。过度使用此功能可能导致代码结构不佳。

### 选项式API

当与[选项式API](https://cn.vuejs.org/guide/introduction#api-styles)一起使用时，你需要在组件设置外定义`createReusableTemplate`，并将其传递给`components`选项以在模板中使用。

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
    <div>{{ data }} 从使用处传递而来</div>
  </DefineTemplate>

  <ReuseTemplate :data="data" msg="第一次使用" />
</template>
```

### 传递数据

可以通过插槽向模板传递数据：

- 使用`v-slot="..."`在`<DefineTemplate>`上访问数据。
- 直接在`<ReuseTemplate>`上绑定数据以传递至模板。

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

### TypeScript支持

`createReusableTemplate`接受泛型类型来为传递给模板的数据提供类型支持：

```vue
<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

// 创建一对 `DefineTemplate` 和 `ReuseTemplate`
const [DefineFoo, ReuseFoo] = createReusableTemplate<{ msg: string }>()

// 可创建多个可复用模板
const [DefineBar, ReuseBar] = createReusableTemplate<{ items: string[] }>()
</script>

<template>
  <DefineFoo v-slot="{ msg }">
    <!-- `msg` 类型为 `string` -->
    <div>Hello {{ msg.toUpperCase() }}</div>
  </DefineFoo>

  <ReuseFoo msg="World" />

  <!-- 类型错误！ -->
  <!-- @ts-expect-error -->
  <ReuseFoo :msg="1" />
</template>
```

另外，如果你不喜欢数组解构，以下用法也是合法的：

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
在Vue 2中不支持点语法。
:::

::: warning
传递布尔类型的props而不使用`v-bind`不受支持。更多细节请查看[注意事项](#boolean-props)部分。
:::

### 传递插槽

也可以通过`<ReuseTemplate>`传递插槽。在`<DefineTemplate>`上，你可以通过`$slots`访问这些插槽：

```vue
<script setup>
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate v-slot="{ $slots, otherProp }">
    <div 一些布局>
      <!-- 渲染插槽 -->
      <component :is="$slots.default" />
    </div>
  </DefineTemplate>

  <ReuseTemplate>
    <div>某些内容</div>
  </ReuseTemplate>
  <ReuseTemplate>
    <div>另一些内容</div>
  </ReuseTemplate>
</template>
```

::: warning
在Vue 2中，传递插槽不生效。
:::

## 注意事项

### Boolean props

与Vue默认行为不同，未使用`v-bind`或缺失的布尔类型props会被解析为空字符串或`undefined`：

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

## 参考资料

该功能来源于[vue-reuse-template](https://github.com/antfu/vue-reuse-template)。

关于复用模板的Vue讨论议题：

- [关于复用模板的讨论](https://github.com/vuejs/core/discussions/6898)

替代方案：

- [Vue Macros - `namedTemplate`](https://vue-macros.sxzz.moe/features/named-template.html)
- [`unplugin-@vueuse/core`](https://github.com/liulinboyi/unplugin-@vueuse/core)
