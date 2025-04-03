---
category: Browser
---

# useFavicon

响应式的网站图标

## 用法

```js
import { useFavicon } from '@vueuse/core'

const icon = useFavicon()

icon.value = 'dark.png' // 更改当前图标
```

### 传递源 ref

你可以将一个 `ref` 传递给它，源 ref 的更改将自动反映到你的网站图标上。

```js {7}
import { useFavicon, usePreferredDark } from '@vueuse/core'
import { computed } from 'vue'

const isDark = usePreferredDark()
const favicon = computed(() => isDark.value ? 'dark.png' : 'light.png')

useFavicon(favicon)
```

当传递了一个源 ref 时，返回的 ref 将与源 ref 相同

```ts
const source = shallowRef('icon.png')
const icon = useFavicon(source)

console.log(icon === source) // true
```
