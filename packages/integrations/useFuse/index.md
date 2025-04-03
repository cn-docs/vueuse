---
category: '@Integrations'
---

# useFuse

使用 [Fuse.js](https://github.com/krisk/fuse) 组合式轻松实现模糊搜索。

来自 Fuse.js 网站的介绍：

> 什么是模糊搜索？
>
> 通常情况下，模糊搜索（更正式地称为近似字符串匹配）是一种找到与给定模式大致相等的字符串的技术（而不是完全相等）。

## 将 Fuse.js 安装为对等依赖项

### 使用 NPM

```bash
npm install fuse.js@^7
```

### 使用 Yarn

```bash
yarn add fuse.js
```

## 使用方法

```ts
import { useFuse } from '@vueuse/integrations/useFuse'
import { shallowRef } from 'vue'

const data = [
  'John Smith',
  'John Doe',
  'Jane Doe',
  'Phillip Green',
  'Peter Brown',
]

const input = shallowRef('Jhon D')

const { results } = useFuse(input, data)

/*
 * 结果:
 *
 * { "item": "John Doe", "index": 1 }
 * { "item": "John Smith", "index": 0 }
 * { "item": "Jane Doe", "index": 2 }
 *
 */
```
