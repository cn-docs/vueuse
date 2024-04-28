---
category: Utilities
---

# useStepper

提供构建多步骤向导界面的辅助工具。

## 用法

### 步骤作为数组

```js
import { useStepper } from '@vueuse/core'

const {
  steps,
  stepNames,
  index,
  current,
  next,
  previous,
  isFirst,
  isLast,
  goTo,
  goToNext,
  goToPrevious,
  goBackTo,
  isNext,
  isPrevious,
  isCurrent,
  isBefore,
  isAfter,
} = useStepper([
  'billing-address',
  'terms',
  'payment',
])

// 通过 `current` 访问步骤
console.log(current.value) // 'billing-address'
```

### 步骤作为对象

```js
import { useStepper } from '@vueuse/core'

const {
  steps,
  stepNames,
  index,
  current,
  next,
  previous,
  isFirst,
  isLast,
  goTo,
  goToNext,
  goToPrevious,
  goBackTo,
  isNext,
  isPrevious,
  isCurrent,
  isBefore,
  isAfter,
} = useStepper({
  'user-information': {
    title: '用户信息',
  },
  'billing-address': {
    title: '账单地址',
  },
  'terms': {
    title: '条款',
  },
  'payment': {
    title: '支付',
  },
})

// 通过 `current` 访问步骤对象
console.log(current.value.title) // '用户信息'
```
