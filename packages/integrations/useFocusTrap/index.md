---
category: '@Integrations'
---

# useFocusTrap

这是 [`focus-trap`](https://github.com/focus-trap/focus-trap) 的响应式封装。

有关可以传递的选项的更多信息，请参阅 `focus-trap` 文档中的 [`createOptions`](https://github.com/focus-trap/focus-trap#createfocustrapelement-createoptions)。

## 安装

```bash
npm i focus-trap@^7
```

## 使用

**基本用法**

```vue
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')
const { hasFocus, activate, deactivate } = useFocusTrap(target)
</script>

<template>
  <div>
    <button @click="activate()">
      激活
    </button>
    <div ref="target">
      <span>是否有焦点: {{ hasFocus }}</span>
      <input type="text">
      <button @click="deactivate()">
        停用
      </button>
    </div>
  </div>
</template>
```

**多个 Ref 引用**

```vue
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useTemplateRef } from 'vue'

const targetOne = useTemplateRef<HTMLDivElement>('targetOne')
const targetTwo = useTemplateRef<HTMLDivElement>('targetTwo')
const { hasFocus, activate, deactivate } = useFocusTrap([targetOne, targetTwo])
</script>

<template>
  <div>
    <button @click="activate()">
      激活
    </button>
    <div ref="targetOne">
      <span>有焦点: {{ hasFocus }}</span>
      <input type="text">
    </div>
    ...
    <div ref="targetTwo">
      <p>另一个目标在这里</p>
      <input type="text">
      <button @click="deactivate()">
        取消激活
      </button>
    </div>
  </div>
</template>
```

**自动聚焦**

```vue
<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')
const { hasFocus, activate, deactivate } = useFocusTrap(target, { immediate: true })
</script>

<template>
  <div>
    <div ref="target">
      ...
    </div>
  </div>
</template>
```

**条件渲染**

这个函数不能正确激活具有使用 `v-if` 进行条件渲染的元素上的焦点。这是因为它们在焦点激活时尚不存在于 DOM 中。要解决这个问题，您需要在下一个刻度上激活。

```vue
<script setup lang="ts">
import { nextTick, useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')
const { activate, deactivate } = useFocusTrap(target, { immediate: true })

const show = ref(false)

async function reveal() {
  show.value = true

  await nextTick()
  activate()
}
</script>

<template>
  <div>
    <div v-if="show" ref="target">
      ...
    </div>

    <button @click="reveal">
      显示并聚焦
    </button>
  </div>
</template>
```

## 使用组件

通过 `UseFocusTrap` 组件，在挂载此组件时，焦点陷阱将自动激活，并在卸载时停用。

```vue
<script setup lang="ts">
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { shallowRef } from 'vue'

const show = shallowRef(false)
</script>

<template>
  <UseFocusTrap v-if="show" :options="{ immediate: true }">
    <div class="modal">
      ...
    </div>
  </UseFocusTrap>
</template>
```
