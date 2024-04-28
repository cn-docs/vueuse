---
category: Browser
---

# useCssVar

操作 CSS 变量

## Usage

```js
import { useCssVar } from '@vueuse/core'

const el = ref(null)
const color1 = useCssVar('--color', el)

const elv = ref(null)
const key = ref('--color')
const colorVal = useCssVar(key, elv)

const someEl = ref(null)
const color2 = useCssVar('--color', someEl, { initialValue: '#eee' })
```
