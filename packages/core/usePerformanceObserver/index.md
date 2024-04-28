---
category: Browser
---

# usePerformanceObserver

观察性能指标。

## Usage

```ts
import { usePerformanceObserver } from '@vueuse/core'

const entrys = ref<PerformanceEntry[]>([])
usePerformanceObserver({
  entryTypes: ['paint'],
}, (list) => {
  entrys.value = list.getEntries()
})
```
