---
category: '@Integrations'
---

# useChangeCase

对 [`change-case`](https://github.com/blakeembrey/change-case) 的响应式封装。

替代 `useCamelCase`、`usePascalCase`、`useSnakeCase`、`useSentenceCase`、`useCapitalize` 等。

## 安装

```bash
npm i change-case@^5
```

## 用法

```ts
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

// `changeCase` 将是一个 computed
const changeCase = useChangeCase('hello world', 'camelCase')
changeCase.value // helloWorld
changeCase.value = 'vue use'
changeCase.value // vueUse
// 支持的方法
// export {
//   camelCase,
//   capitalCase,
//   constantCase,
//   dotCase,
//   headerCase,
//   noCase,
//   paramCase,
//   pascalCase,
//   pathCase,
//   sentenceCase,
//   snakeCase,
// } from 'change-case'
```

或者将一个 `ref` 传递给它，返回的 `computed` 将随着源 `ref` 的变化而变化。

可以将其传递给 `options` 进行定制化

```ts
import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import { ref } from 'vue'

const input = ref('helloWorld')
const changeCase = useChangeCase(input, 'camelCase', {
  delimiter: '-',
})
changeCase.value // hello-World
ref.value = 'vue use'
changeCase.value // vue-Use
```
