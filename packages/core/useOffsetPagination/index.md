---
category: Utilities
---

# useOffsetPagination

响应式的偏移分页。

## 使用方法

```ts
import { useOffsetPagination } from '@vueuse/core'

function fetchData({ currentPage, currentPageSize }: { currentPage: number, currentPageSize: number }) {
  fetch(currentPage, currentPageSize).then((responseData) => {
    data.value = responseData
  })
}

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: database.value.length,
  page: 1,
  pageSize: 10,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
})
```

## 组件使用

```vue
<template>
  <UseOffsetPagination
    v-slot="{
      currentPage,
      currentPageSize,
      next,
      prev,
      pageCount,
      isFirstPage,
      isLastPage,
    }"
    :total="database.length"
    @page-change="fetchData"
    @page-size-change="fetchData"
  >
    <div class="gap-x-4 gap-y-2 grid-cols-2 inline-grid items-center">
      <div opacity="50">
        总数：
      </div>
      <div>{{ database.length }}</div>
      <div opacity="50">
        页数：
      </div>
      <div>{{ pageCount }}</div>
      <div opacity="50">
        每页大小：
      </div>
      <div>{{ currentPageSize }}</div>
      <div opacity="50">
        当前页码：
      </div>
      <div>{{ currentPage }}</div>
      <div opacity="50">
        是否第一页：
      </div>
      <div>{{ isFirstPage }}</div>
      <div opacity="50">
        是否最后一页：
      </div>
      <div>{{ isLastPage }}</div>
    </div>
    <div>
      <button :disabled="isFirstPage" @click="prev">
        上一页
      </button>
      <button :disabled="isLastPage" @click="next">
        下一页
      </button>
    </div>
  </UseOffsetPagination>
</template>
```

组件事件支持回调和事件监听器。

事件监听器：

```vue
<template>
  <UseOffsetPagination
    v-slot="{
      currentPage,
      currentPageSize,
      next,
      prev,
      pageCount,
      isFirstPage,
      isLastPage,
    }"
    :total="database.length"
    @page-change="fetchData"
    @page-size-change="fetchData"
    @page-count-change="onPageCountChange"
  >
    <!-- 你的代码 -->
  </UseOffsetPagination>
</template>
```

或者使用 props 回调：

```vue
<template>
  <UseOffsetPagination
    v-slot="{
      currentPage,
      currentPageSize,
      next,
      prev,
      pageCount,
      isFirstPage,
      isLastPage,
    }"
    :total="database.length"
    :on-page-change="fetchData"
    :on-page-size-change="fetchData"
    :on-page-count-change="onPageCountChange"
  >
    <!-- 你的代码 -->
  </UseOffsetPagination>
</template>
```
