<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { isClient } from '@vueuse/shared'
import { shallowRef, useTemplateRef } from 'vue'
import { UseDraggable as Draggable } from './component'

const el = useTemplateRef<HTMLElement>('el')
const handle = useTemplateRef<HTMLElement>('handle')

const innerWidth = isClient ? window.innerWidth : 200

const disabled = shallowRef(false)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: innerWidth / 4.2, y: 80 },
  preventDefault: true,
  disabled,
})
</script>

<template>
  <div>
    <div class="text-xs">
      <label class="checkbox">
        <input
          :checked="disabled" type="checkbox" name="enabled"
          @input="($event.target as HTMLInputElement)!.checked ? disabled = true : disabled = false "
        >
        <span>禁用拖动</span>
      </label>
    </div>
    <p class="italic op50 text-center">
      选中浮动框
    </p>
    <div
      ref="el"
      p="x-4 y-2"
      border="~ gray-800/30 rounded"
      shadow="~ hover:lg"
      class="fixed bg-$vp-c-bg select-none cursor-move z-31"
      style="touch-action:none;"
      :style="style"
    >
      👋 拖动我!
      <div class="text-sm opacity-50">
        我在 {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </div>

    <Draggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="fixed bg-$vp-c-bg select-none cursor-move z-31"
      :initial-value="{ x: innerWidth / 3.9, y: 150 }"
      prevent-default
      storage-key="vueuse-draggable-pos"
      storage-type="session"
      :disabled="disabled"
    >
      无渲染组件
      <div class="text-xs opacity-50">
        在 sessionStorage 中保存的位置
      </div>
      <div class="text-sm opacity-50">
        {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </Draggable>

    <Draggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="fixed bg-$vp-c-bg select-none z-31"
      :initial-value="{ x: innerWidth / 3.6, y: 240 }"
      :prevent-default="true"
      :handle="handle"
      :disabled="disabled"
    >
      <div ref="handle" class="cursor-move">
        👋 拖到这里!
      </div>
      <div class="text-xs opacity-50">
        触发拖动事件的元素
      </div>
      <div class="text-sm opacity-50">
        我在 {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </Draggable>
  </div>
</template>
