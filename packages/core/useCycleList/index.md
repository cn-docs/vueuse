---
category: Unknown
---

# useCycleList

循环遍历一个项目列表。

<CourseLink href="https://vueschool.io/lessons/create-an-image-carousel-with-vueuse?friend=vueuse">通过 Vue School 的这个免费视频课程学习如何使用 useCycleList 创建图片轮播！</CourseLink>

## 用法

```ts
import { useCycleList } from '@vueuse/core'

const { state, next, prev, go } = useCycleList([
  'Dog',
  'Cat',
  'Lizard',
  'Shark',
  'Whale',
  'Dolphin',
  'Octopus',
  'Seal',
])

console.log(state.value) // 'Dog'

prev()

console.log(state.value) // 'Seal'

go(3)

console.log(state.value) // 'Shark'
```
