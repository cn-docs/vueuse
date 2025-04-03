---
category: Component
---

# useVModel

v-model 绑定的简写，props + emit -> ref

> 我们鼓励你使用 Vue 的 [`defineModel`](https://vuejs.org/api/sfc-script-setup.html#definemodel) 而不是这个组合式函数，但是有一些边缘情况，比如使用 `TSX` 或 `deep: true` 选项，这些是 `defineModel` 不支持的。

## 用法

```js
import { useVModel } from '@vueuse/core'

export default {
  setup(props, { emit }) {
    const data = useVModel(props, 'data', emit)

    console.log(data.value) // props.data
    data.value = 'foo' // emit('update:data', 'foo')
  },
}
```

### `<script setup>`

```vue
<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>
```
