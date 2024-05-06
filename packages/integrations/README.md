# @vueuse/integrations

[![NPM version](https://img.shields.io/npm/v/@vueuse/integrations?color=a1b858)](https://www.npmjs.com/package/@vueuse/integrations)

> This is an add-on of [VueUse](https://github.com/vueuse/vueuse), providing integration wrappers for utility libraries.

## Install

```bash
npm i @vueuse/integrations
```

## Functions

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--FUNCTIONS_LIST_STARTS-->

- [`useAsyncValidator`](https://vueuse.org/integrations/useAsyncValidator/) — 对 [`async-validator`](https://github.com/yiminghe/async-validator) 的封装。
- [`useAxios`](https://vueuse.org/integrations/useAxios/) — 对 [`axios`](https://github.com/axios/axios) 的封装。
- [`useChangeCase`](https://vueuse.org/integrations/useChangeCase/) — 对 [`change-case`](https://github.com/blakeembrey/change-case) 的响应式封装。
- [`useCookies`](https://vueuse.org/integrations/useCookies/) — 对 [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) 的包装。
- [`useDrauu`](https://vueuse.org/integrations/useDrauu/) — 这是 [drauu](https://github.com/antfu/drauu) 的响应式实例。
- [`useFocusTrap`](https://vueuse.org/integrations/useFocusTrap/) — 这是 [`focus-trap`](https://github.com/focus-trap/focus-trap) 的响应式封装。
- [`useFuse`](https://vueuse.org/integrations/useFuse/) — 使用 [Fuse.js](https://github.com/krisk/fuse) 组合式轻松实现模糊搜索。
- [`useIDBKeyval`](https://vueuse.org/integrations/useIDBKeyval/) — [`idb-keyval`](https://www.npmjs.com/package/idb-keyval) 的封装。
- [`useJwt`](https://vueuse.org/integrations/useJwt/) — [`jwt-decode`](https://github.com/auth0/jwt-decode) 的封装。
- [`useNProgress`](https://vueuse.org/integrations/useNProgress/) — [`nprogress`](https://github.com/rstacruz/nprogress) 的响应式封装。
- [`useQRCode`](https://vueuse.org/integrations/useQRCode/) — [`qrcode`](https://github.com/soldair/node-qrcode) 的封装。
- [`useSortable`](https://vueuse.org/integrations/useSortable/) — [`sortable`](https://github.com/SortableJS/Sortable) 的封装。

<!--FUNCTIONS_LIST_ENDS-->

## Tree-shaking

For better tree-shaking result, import functions from submodules, for example:

```ts
import { useAxios } from '@vueuse/integrations/useAxios'

// Don't
import { useAxios } from '@vueuse/integrations'
```

## License

[MIT License](https://github.com/vueuse/vueuse/blob/master/LICENSE) © 2019-PRESENT [Anthony Fu](https://github.com/antfu)
