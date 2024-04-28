---
category: Utilities
---

# useConfirmDialog

创建事件钩子以支持模态框和确认对话框链。

函数可以在模板中使用，而钩子是模态对话框或其他需要用户确认的操作的业务逻辑的便捷骨架。

## 函数和钩子

- `reveal()` - 触发 `onReveal` 钩子并将 `revealed.value` 设置为 `true`。返回一个由 `confirm()` 或 `cancel()` 解析的 promise。
- `confirm()` - 将 `isRevealed.value` 设置为 `false` 并触发 `onConfirm` 钩子。
- `cancel()` - 将 `isRevealed.value` 设置为 `false` 并触发 `onCancel` 钩子。

## 基本用法

### 使用钩子

```vue
<script setup>
import { useConfirmDialog } from '@vueuse/core'

const { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel }
    = useConfirmDialog()
</script>

<template>
  <button @click="reveal">
    显示模态框
  </button>

  <teleport to="body">
    <div v-if="isRevealed" class="modal-bg">
      <div class="modal">
        <h2>确认？</h2>
        <button @click="confirm">
          是
        </button>
        <button @click="cancel">
          取消
        </button>
      </div>
    </div>
  </teleport>
</template>
```

### Promise

如果你更喜欢使用 promises：

```vue
<script setup>
import { useConfirmDialog } from '@vueuse/core'

const {
  isRevealed,
  reveal,
  confirm,
  cancel,
} = useConfirmDialog()

async function openDialog() {
  const { data, isCanceled } = await reveal()
  if (!isCanceled)
    console.log(data)
}
</script>

<template>
  <button @click="openDialog">
    显示模态框
  </button>

  <teleport to="body">
    <div v-if="isRevealed" class="modal-layout">
      <div class="modal">
        <h2>确认？</h2>
        <button @click="confirm(true)">
          是
        </button>
        <button @click="confirm(false)">
          否
        </button>
      </div>
    </div>
  </teleport>
</template>
```
