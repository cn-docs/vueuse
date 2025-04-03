<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, shallowRef, toRefs, useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLElement>('el')
const smooth = shallowRef(false)
const behavior = computed(() => smooth.value ? 'smooth' : 'auto')
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, { behavior })
const { left, right, top, bottom } = toRefs(arrivedState)
const { left: toLeft, right: toRight, top: toTop, bottom: toBottom } = toRefs(directions)

// 通过toFixed()格式化数字，以便更好地显示
const displayX = computed({
  get() {
    return x.value.toFixed(1)
  },
  set(val) {
    x.value = Number.parseFloat(val)
  },
})
const displayY = computed({
  get() {
    return y.value.toFixed(1)
  },
  set(val) {
    y.value = Number.parseFloat(val)
  },
})
</script>

<template>
  <div class="flex">
    <div ref="el" class="w-300px h-300px m-auto overflow-scroll bg-gray-500/5 rounded">
      <div class="w-500px h-400px relative">
        <div position="absolute left-0 top-0" bg="gray-500/5" p="x-2 y-1">
          左上角
        </div>
        <div position="absolute left-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
          左下角
        </div>
        <div position="absolute right-0 top-0" bg="gray-500/5" p="x-2 y-1">
          右上角
        </div>
        <div position="absolute right-0 bottom-0" bg="gray-500/5" p="x-2 y-1">
          右下角
        </div>
        <div position="absolute left-1/3 top-1/3" bg="gray-500/5" p="x-2 y-1">
          滚动我
        </div>
      </div>
    </div>
    <div class="m-auto w-280px pl-4">
      <div class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
        <span text="right" opacity="75" class="py-4">X 位置</span>
        <div class="text-primary">
          <div>
            <input v-model="displayX" type="number" min="0" max="200" step="10" class="w-full !min-w-0">
          </div>
        </div>
        <span text="right" opacity="75" class="py-4">Y 位置</span>
        <div class="text-primary">
          <div>
            <input v-model="displayY" type="number" min="0" max="100" step="10" class="w-full !min-w-0">
          </div>
        </div>
        <label for="smooth-scrolling-option" text="right" opacity="75">平滑滚动</label>
        <span><input id="smooth-scrolling-option" v-model="smooth" type="checkbox"></span>
        <span text="right" opacity="75">正在滚动</span>
        <BooleanDisplay :value="isScrolling" />
        <div text="right" opacity="75">
          到达顶部
        </div>
        <BooleanDisplay :value="top" />
        <div text="right" opacity="75">
          到达右侧
        </div>
        <BooleanDisplay :value="right" />
        <div text="right" opacity="75">
          到达底部
        </div>
        <BooleanDisplay :value="bottom" />
        <div text="right" opacity="75">
          到达左侧
        </div>
        <BooleanDisplay :value="left" />
        <div text="right" opacity="75">
          向上滚动
        </div>
        <BooleanDisplay :value="toTop" />
        <div text="right" opacity="75">
          向右滚动
        </div>
        <BooleanDisplay :value="toRight" />
        <div text="right" opacity="75">
          向下滚动
        </div>
        <BooleanDisplay :value="toBottom" />
        <div text="right" opacity="75">
          向左滚动
        </div>
        <BooleanDisplay :value="toLeft" />
      </div>
    </div>
  </div>
</template>
