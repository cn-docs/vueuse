---
category: Reactivity
---

# reactifyObject

将 `reactify` 应用于对象

## 使用

```ts
import { reactifyObject } from '@vueuse/core'

const reactifiedConsole = reactifyObject(console)

const a = ref('42')

reactifiedConsole.log(a) // no longer need `.value`
```
