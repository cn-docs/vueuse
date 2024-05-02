---
category: Utilities
---

# useToggle

一个带有实用功能的布尔切换器。

## 用法

```js
import { useToggle } from '@vueuse/core'

const [value, toggle] = useToggle()
```

当你传入一个 ref 时，`useToggle` 将返回一个简单的切换函数：

```js
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

注意：请注意，切换函数接受第一个参数作为覆盖值。您可能希望避免直接将函数传递给模板中的事件，因为事件对象将被传入。

```html
<!-- 注意：$event 将被传入 -->
<button @click="toggleDark" />
<!-- 推荐这样做 -->
<button @click="toggleDark()" />
```
