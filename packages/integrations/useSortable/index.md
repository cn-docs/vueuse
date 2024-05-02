---
category: '@Integrations'
---

# useSortable

[`sortable`](https://github.com/SortableJS/Sortable) 的封装。

要了解可以传递的选项的更多信息，请参阅 `Sortable` 文档中的 [`Sortable.options`](https://github.com/SortableJS/Sortable#options)。

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

### 使用指定的选择器操作

```vue
<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const list = ref([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }])

const animation = 200

const { option } = useSortable(el, list, {
  handle: '.handle',
  // 或者设置 option
  // animation
})

// 您可以使用 option 方法设置和获取 Sortable 的选项
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

如果您想要自己处理 onUpdate，可以传递 onUpdate 参数，我们还提供了一个移动项目位置的函数。

```ts
import { moveArrayElement } from '@vueuse/integrations/useSortable'

useSortable(el, list, {
  onUpdate: (e) => {
    // 处理更新
    moveArrayElement(list.value, e.oldIndex, e.newIndex)
    // 这里需要 nextTick，因为 moveArrayElement 在微任务中执行
    // 所以我们需要等到下一个刻度直到它完成。
    nextTick(() => {
      /* do something */
    })
  }
})
```
