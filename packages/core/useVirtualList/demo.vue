<script setup lang="ts">
import { useVirtualList } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

const index = shallowRef<number>()
const search = shallowRef('')

const allItems = Array.from(Array.from({ length: 99999 }).keys())
  .map(i => ({
    height: i % 2 === 0 ? 42 : 84,
    size: i % 2 === 0 ? 'small' : 'large',
  }))

const filteredItems = computed(() => {
  return allItems.filter(i => i.size.startsWith(search.value.toLowerCase()))
})

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  filteredItems,
  {
    itemHeight: i => (filteredItems.value[i].height + 8),
    overscan: 10,
  },
)
function handleScrollTo() {
  if (index.value)
    scrollTo(index.value)
}
</script>

<template>
  <div>
    <div>
      <div class="inline-block mr-4">
        跳转到索引
        <input v-model="index" placeholder="索引" type="number">
      </div>
      <button type="button" @click="handleScrollTo">
        前往
      </button>
    </div>
    <div>
      <div class="inline-block mr-4">
        按尺寸筛选列表
        <input v-model="search" placeholder="例如小号，中号，大号" type="search">
      </div>
    </div>
    <div v-bind="containerProps" class="h-300px overflow-auto p-2 bg-gray-500/5 rounded">
      <div v-bind="wrapperProps">
        <div
          v-for="{ index, data } in list"
          :key="index"
          class="border border-$c-divider mb-2"
          :style="{
            height: `${data.height}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          第 {{ index }} 行 <span opacity="70" m="l-1">（{{ data.size }}）</span>
        </div>
      </div>
    </div>
  </div>
</template>
