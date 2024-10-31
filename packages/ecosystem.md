# 生态系统

在开发 VueUse 的过程中，我们时不时地将正在使用的工具提取为可独立使用的单独项目。

<h2 align="center">
<a href="https://github.com/vueuse/vue-demi" target="_blank">
<img src="https://github.com/vueuse/vue-demi/raw/main/assets/banner.png" alt="vue-demi" width="500"/>
</a>
</h2>

Vue Demi 是一个为库作者设计的工具，用于创建与 VueUse 类似的、能够同构适用于 Vue 2 和 Vue 3 的组合式库。它已被许多流行库广泛采用，如 [`vuelidate`](https://github.com/vuelidate/vuelidate) 和 [`vue-promised`](https://github.com/posva/vue-promised)。

<h2 align="center">
<a href="https://github.com/vueuse/vue-chemistry" target="_blank">
<img src="https://github.com/vueuse/vue-chemistry/raw/main/res/hero.png" alt="vue-chemistry" width="500"/>
</a>
</h2>

Vue Chemistry 利用了 `reactify` 函数，并将其应用于常见的 JavaScript API，从而实现纯粹的响应式编程体验。例如：

```js
import * as console from 'vue-chemistry/console'
import { set } from 'vue-chemistry/core'
import { sum } from 'vue-chemistry/math'

const a = ref(1)
const b = ref(2)

const c = sum(a, b) // c = a + b = 3

set(a, 2) // shorthand for a.value = 2

console.log(c) // it's 4 (2 + 2)!
```
