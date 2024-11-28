# 生态系统

在开发 VueUse 的过程中，我们不时地会把正在使用的工具提取到独立的项目中，使其可以单独使用。

<h2 align="center">
<a href="https://github.com/vueuse/vue-chemistry" target="_blank">
<img src="https://github.com/vueuse/vue-chemistry/raw/main/res/hero.png" alt="vue-chemistry" width="500"/>
</a>
</h2>

Vue Chemistry 利用 `reactify` 函数并将其应用于常见的 JavaScript API，从而实现纯响应式编程体验。例如：

```js
import * as console from 'vue-chemistry/console'
import { set } from 'vue-chemistry/core'
import { sum } from 'vue-chemistry/math'

const a = ref(1)
const b = ref(2)

const c = sum(a, b) // c = a + b = 3

set(a, 2) // 相当于 a.value = 2

console.log(c) // 结果是 4 (2 + 2)！
```
