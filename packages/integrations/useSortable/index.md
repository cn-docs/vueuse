---
category: '@Integrations'
---

# useSortable

[`sortable`](https://github.com/SortableJS/Sortable) 的封装。

关于可传递的选项的更多信息，请参见 `Sortable` 文档中的 [`Sortable.options`](https://github.com/SortableJS/Sortable#options)。

## 安装

```bash
npm i sortablejs@^1
```

## 使用方法

### 使用模板引用

```vue
<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const list = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }])

useSortable(el, list)
</script>

<template>
  <div ref="el">
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

### 使用指定选择器进行操作

```vue
<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const list = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }])

const animation = 200

const { option } = useSortable(el, list, {
  handle: '.handle',
  // 或设置选项
  // animation
})

// 你可以使用 option 方法来设置和获取 Sortable 的选项
option('animation', animation)
// option('animation') // 200
</script>

<template>
  <div ref="el">
    <div v-for="item in list" :key="item.id">
      <span>{{ item.name }}</span>
      <span class="handle">*</span>
    </div>
  </div>
</template>
```

### 使用选择器获取根元素

```vue
<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const list = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }])

useSortable('#dv', list)
</script>

<template>
  <div id="dv">
    <div v-for="item in list" :key="item.id">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
```

### 提示

如果你想自己处理 onUpdate，你可以传入 onUpdate 参数，我们也提供了一个移动项目位置的函数。

```ts
import { moveArrayElement } from '@vueuse/integrations/useSortable'

useSortable(el, list, {
  onUpdate: (e) => {
    // 执行某些操作
    moveArrayElement(list.value, e.oldIndex, e.newIndex, e)
    // 这里需要 nextTick，因为 moveArrayElement 在微任务中执行
    // 所以我们需要等到下一个 tick 直到完成
    nextTick(() => {
      /* 执行某些操作 */
    })
  }
})
```
