# 附加组件

核心包致力于保持轻量化且无依赖。而附加组件则是将流行的包封装成统一的 API 风格。

## Head - [`@vueuse/head`](https://github.com/vueuse/head) <carbon-link class="external-link"/>

Vue 3 的文档头部管理器。支持 SSR。由 [@egoist](https://github.com/egoist) 创建和维护。

## Motion - [`@vueuse/motion`](https://github.com/vueuse/motion) <carbon-link class="external-link"/>

为你的**组件**添加**动画效果**的 **Vue Composables**。

- 🏎 基于 [**Popmotion**](https://popmotion.io/) 的**流畅动画**
- 🎮 **声明式** API
- 🚀 **即插即用**，提供 **10+ 预设**
- 🚚 通过 [**nuxt-use-motion**](https://github.com/Tahul/nuxt-use-motion) 支持 **Nuxt**
- ✨ 使用 **TypeScript** 编写
- 🏋️‍♀️ 轻量级，打包体积 **<20kb**

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## Gesture - [`@vueuse/gesture`](https://github.com/vueuse/gesture) <carbon-link class="external-link"/>

让你的应用**交互**的 **Vue Composables**

- 🚀 **即插即用**
- 🕹 支持**鼠标**和**触摸**
- 🎮 支持**指令** (**v-drag**, **v-pinch**, **v-move**...)
- ✨ 使用 **TypeScript** 编写
- 🤹 可与 [**vueuse/motion**](https://github.com/vueuse/motion) 或**任何其他**动画方案完美配合

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## Sound - [`@vueuse/sound`](https://github.com/vueuse/sound) <carbon-link class="external-link"/>

用于播放音效的 Vue composables。

- 👂 让你的网站能够使用**两种人类感官**而不是一种来**交流**
- 🔥 使用 **Vue** Composition API 构建
- 🚚 通过 [**@vueuse/sound/nuxt**](https://github.com/vueuse/sound#nuxt) 支持 **Nuxt 3**
- ⚡️ 打包体积仅 **<1kb**（gzip）！**~10kb** 异步加载
- ✨ 使用 **TypeScript** 构建
- 🗣 使用强大的、经过实战检验的音频工具：[**Howler.js**](https://howlerjs.com/)

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## SchemaOrg - [`@vueuse/schema-org`](https://github.com/vueuse/schema-org) <carbon-link class="external-link"/>

Vue 的 Schema.org 实现。支持类型化和自动化的 Google Rich Results。

- 😊 无需 Schema 知识，通过最少的配置即可在几分钟内上手使用
- ✨ 20+ 类型化 Schema，用于最佳实践（[Google](https://developers.google.com/search/docs/advanced/structured-data/search-gallery)、[Yoast](https://developer.yoast.com/features/schema/overview)）Rich Results
- 🧙 自动化 Schema：`@id`、URL/日期解析、路由元数据等
- 🤝 集成 [VitePress](https://vitepress.vue.com)、[Nuxt](https://nuxtjs.org/)、[Vitesse](https://nuxtjs.org/) 和 [Vite](https://vitejs.dev/)，支持自动导入
- 🍞 选择你喜欢的 API：Composables 或组件
- 🌳 支持 SSR、tree-shaking 和 Schema 继承

> 由 [@harlan-zw](https://github.com/harlan-zw) 创建和维护

<!--生成的列表，请勿手动修改-->
<!--ADDONS_LIST_STARTS-->

## Router - [`@vueuse/router`](https://vueuse.org/router/README.html)

vue-router 的实用工具

- [`useRouteHash`](https://vueuse.org/router/useRouteHash/) — `route.hash` 的响应式简写
- [`useRouteParams`](https://vueuse.org/router/useRouteParams/) — `route.params` 的响应式简写
- [`useRouteQuery`](https://vueuse.org/router/useRouteQuery/) — `route.query` 的响应式简写

## Integrations - [`@vueuse/integrations`](https://vueuse.org/integrations/README.html)

实用库的集成封装

- [`useAsyncValidator`](https://vueuse.org/integrations/useAsyncValidator/) — [`async-validator`](https://github.com/yiminghe/async-validator) 的封装
- [`useAxios`](https://vueuse.org/integrations/useAxios/) — [`axios`](https://github.com/axios/axios) 的封装
- [`useChangeCase`](https://vueuse.org/integrations/useChangeCase/) — [`change-case`](https://github.com/blakeembrey/change-case) 的响应式封装
- [`useCookies`](https://vueuse.org/integrations/useCookies/) — [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) 的封装
- [`useDrauu`](https://vueuse.org/integrations/useDrauu/) — [drauu](https://github.com/antfu/drauu) 的响应式实例
- [`useFocusTrap`](https://vueuse.org/integrations/useFocusTrap/) — [`focus-trap`](https://github.com/focus-trap/focus-trap) 的响应式封装
- [`useFuse`](https://vueuse.org/integrations/useFuse/) — 使用 [Fuse.js](https://github.com/krisk/fuse) 轻松实现模糊搜索的 composable
- [`useIDBKeyval`](https://vueuse.org/integrations/useIDBKeyval/) — [`idb-keyval`](https://www.npmjs.com/package/idb-keyval) 的封装
- [`useJwt`](https://vueuse.org/integrations/useJwt/) — [`jwt-decode`](https://github.com/auth0/jwt-decode) 的封装
- [`useNProgress`](https://vueuse.org/integrations/useNProgress/) — [`nprogress`](https://github.com/rstacruz/nprogress) 的响应式封装
- [`useQRCode`](https://vueuse.org/integrations/useQRCode/) — [`qrcode`](https://github.com/soldair/node-qrcode) 的封装
- [`useSortable`](https://vueuse.org/integrations/useSortable/) — [`sortable`](https://github.com/SortableJS/Sortable) 的封装

## RxJS - [`@vueuse/rxjs`](https://vueuse.org/rxjs/README.html)

在 Vue 中启用 RxJS 响应式函数

- [`from`](https://vueuse.org/rxjs/from/) — RxJS [`from()`](https://rxjs.dev/api/index/function/from) 和 [`fromEvent()`](https://rxjs.dev/api/index/function/fromEvent) 的封装，允许接受 `ref`
- [`toObserver`](https://vueuse.org/rxjs/toObserver/) — 将 `ref` 转换为 RxJS [Observer](https://rxjs.dev/guide/observer) 的语法糖
- [`useExtractedObservable`](https://vueuse.org/rxjs/useExtractedObservable/) — 使用从一个或多个 composables 中提取的 RxJS [`Observable`](https://rxjs.dev/guide/observable)
- [`useObservable`](https://vueuse.org/rxjs/useObservable/) — 使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)
- [`useSubject`](https://vueuse.org/rxjs/useSubject/) — 将 RxJS [`Subject`](https://rxjs.dev/guide/subject) 绑定到 `ref` 并双向传播值的变化
- [`useSubscription`](https://vueuse.org/rxjs/useSubscription/) — 使用 RxJS [`Subscription`](https://rxjs.dev/guide/subscription)，无需担心取消订阅或内存泄漏
- [`watchExtractedObservable`](https://vueuse.org/rxjs/watchExtractedObservable/) — 监听从一个或多个 composables 中提取的 RxJS [`Observable`](https://rxjs.dev/guide/observable) 的值

## Firebase - [`@vueuse/firebase`](https://vueuse.org/firebase/README.html)

启用 Firebase 的实时绑定

- [`useAuth`](https://vueuse.org/firebase/useAuth/) — 响应式 [Firebase Auth](https://firebase.google.com/docs/auth) 绑定
- [`useFirestore`](https://vueuse.org/firebase/useFirestore/) — 响应式 [Firestore](https://firebase.google.com/docs/firestore) 绑定
- [`useRTDB`](https://vueuse.org/firebase/useRTDB/) — 响应式 [Firebase Realtime Database](https://firebase.google.com/docs/database) 绑定

## Electron - [`@vueuse/electron`](https://vueuse.org/electron/README.html)

VueUse 的 Electron 渲染进程模块

- [`useIpcRenderer`](https://vueuse.org/electron/useIpcRenderer/) — 提供 [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 及其所有 API
- [`useIpcRendererInvoke`](https://vueuse.org/electron/useIpcRendererInvoke/) — 响应式 [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) 结果
- [`useIpcRendererOn`](https://vueuse.org/electron/useIpcRendererOn/) — 轻松使用 [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener) 并在组件卸载时自动 [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener)
- [`useZoomFactor`](https://vueuse.org/electron/useZoomFactor/) — 响应式 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放因子
- [`useZoomLevel`](https://vueuse.org/electron/useZoomLevel/) — 响应式 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放级别

<!--ADDONS_LIST_ENDS-->
