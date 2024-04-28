---
category: Utilities
---

# useSupported

SSR 兼容性检测 `isSupported`

## 用法

```ts
import { useSupported } from '@vueuse/core'

const isSupported = useSupported(() => navigator && 'getBattery' in navigator)

if (isSupported.value) {
  // 执行一些操作
  navigator.getBattery
}
```
