# 插件

核心包旨在轻量且无依赖。而插件则将流行的包封装成一致的 API 风格。

## Head - [`@vueuse/head`](https://github.com/vueuse/head) <carbon-link class="external-link"/>

用于 Vue 3 的文档头管理器。支持 SSR。由 [@egoist](https://github.com/egoist) 创建和维护。

## Motion - [`@vueuse/motion`](https://github.com/vueuse/motion) <carbon-link class="external-link"/>

**Vue 组合式工具库** 将您的 **组件** 进行 **动效** 化。

- 🏎 基于 [**Popmotion**](https://popmotion.io/) 的 **平滑动画**
- 🎮 **声明式** API
- 🚀 **即插即用**，支持 **10+ 预设动画**
- ✅ 使用 [**vue-demi**](https://github.com/antfu/vue-demi) 支持 **Vue 2 & 3**
- 🚚 使用 [**nuxt-use-motion**](https://github.com/Tahul/nuxt-use-motion) 支持 **Nuxt**
- ✨ 使用 **TypeScript** 编写
- 🏋️‍♀️ 轻量级，仅 **20kb**

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## Gesture - [`@vueuse/gesture`](https://github.com/vueuse/gesture) <carbon-link class="external-link"/>

**Vue 组合式工具库** 使您的应用程序具有 **交互性**

- 🚀 **即插即用**
- 🕹 **鼠标** 和 **触摸** 支持
- 🎮 **指令** 支持（**v-drag**、**v-pinch**、**v-move** 等）
- ✨ 使用 **TypeScript** 编写
- ✅ 使用 [**vue-demi**](https://github.com/antfu/vue-demi) 支持 **Vue 2 & 3**
- 🤹 与 [**vueuse/motion**](https://github.com/vueuse/motion) 或 **任何其他** 动画解决方案兼容

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## Sound - [`@vueuse/sound`](https://github.com/vueuse/sound) <carbon-link class="external-link"/>

用于播放声音效果的 Vue 组合式工具库。

- 👂 让您的网站使用 **2 种人类感官** 进行 **交流**
- 🔥 使用 **Vue** 组合式 API 构建
- ✅ 使用 [**vue-demi**](https://github.com/antfu/vue-demi) 支持 **Vue 2 & 3**
- 🚚 使用 [**@vueuse/sound/nuxt**](https://github.com/vueuse/sound#nuxt) 支持 **Nuxt 2 & 3**
- ⚡️ 在您的 **捆绑包** 中仅有 **<1kb**（gzip 压缩）！**~10kb** 异步加载。
- ✨ 使用 **TypeScript** 编写
- 🗣 使用经过充分测试的强大音频实用程序：[**Howler.js**](https://howlerjs.com/)

> 由 [@Tahul](https://github.com/Tahul) 创建和维护

## SchemaOrg - [`@vueuse/schema-org`](https://github.com/vueuse/schema-org) <carbon-link class="external-link"/>

用于 Vue 的 Schema.org。支持类型化和自动化的 Google 丰富结果

- 😊 无需 Schema 知识，只需进行最少的配置即可在几分钟内上手
- ✨ 20+ 类型化模式，实现最佳实践（[Google](https://developers.google.com/search/docs/advanced/structured-data/search-gallery)，[Yoast](https://developer.yoast.com/features/schema/overview)）丰富结果
- 🧙 自动化 Schema：`@id`，URL / 日期解析，路由元数据等
- 🤝 集成为 [VitePress](https://vitepress.vue.com)，[Nuxt](https://nuxtjs.org/)，[Vitesse](https://nuxtjs.org/) 和 [Vite](https://vitejs.dev/) 提供自动导入
- 🍞 选择您喜欢的 API：组合式或组件
- 🌳 支持 SSR、树摇和模式继承

> 由 [@harlan-zw](https://github.com/harlan-zw) 创建和维护

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--ADDONS_LIST_STARTS-->

## Router - [`@vueuse/router`](https://vueuse.org/router/README.html)

Utilities for vue-router

- [`useRouteHash`](https://vueuse.org/router/useRouteHash/) — 对响应式的 `route.hash` 的简写。
- [`useRouteParams`](https://vueuse.org/router/useRouteParams/) — 对响应式的 `route.params` 的简写。
- [`useRouteQuery`](https://vueuse.org/router/useRouteQuery/) — 对响应式的 `route.query` 的简写。

## Integrations - [`@vueuse/integrations`](https://vueuse.org/integrations/README.html)

Integration wrappers for utility libraries

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

## RxJS - [`@vueuse/rxjs`](https://vueuse.org/rxjs/README.html)

Enables RxJS reactive functions in Vue

- [`from`](https://vueuse.org/rxjs/from/) — rxJS 的 [`from()`](https://rxjs.dev/api/index/function/from) 和 [`fromEvent()`](https://rxjs.dev/api/index/function/fromEvent) 的包装器，使它们能够接受 `ref`。
- [`toObserver`](https://vueuse.org/rxjs/toObserver/) — sugar function to convert a `ref` into an RxJS [Observer](https://rxjs.dev/guide/observer)
- [`useExtractedObservable`](https://vueuse.org/rxjs/useExtractedObservable/) — 从一个或多个组合式中提取并使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。
- [`useObservable`](https://vueuse.org/rxjs/useObservable/) — 使用 RxJS [`Observable`](https://rxjs.dev/guide/observable)，返回一个 `ref`，并在组件卸载时自动取消订阅。
- [`useSubject`](https://vueuse.org/rxjs/useSubject/) — 将 RxJS [`Subject`](https://rxjs.dev/guide/subject) 绑定到一个 `ref` 上，并在两者之间传播值变化。
- [`useSubscription`](https://vueuse.org/rxjs/useSubscription/) — 使用 RxJS [`Subscription`](https://rxjs.dev/guide/subscription)，无需担心取消订阅或创建内存泄漏。
- [`watchExtractedObservable`](https://vueuse.org/rxjs/watchExtractedObservable/) — 监视从一个或多个组合式中提取的 RxJS [`Observable`](https://rxjs.dev/guide/observable) 的值。

## Firebase - [`@vueuse/firebase`](https://vueuse.org/firebase/README.html)

Enables realtime bindings for Firebase

- [`useAuth`](https://vueuse.org/firebase/useAuth/) — 响应式的 [Firebase Auth](https://firebase.google.com/docs/auth) 绑定。它提供了一个响应式的 `user` 和 `isAuthenticated`，因此您可以轻松地对用户的身份验证状态变化做出反应。
- [`useFirestore`](https://vueuse.org/firebase/useFirestore/) — 响应式的 [Firestore](https://firebase.google.com/docs/firestore) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。
- [`useRTDB`](https://vueuse.org/firebase/useRTDB/) — 响应式的 [Firebase 实时数据库](https://firebase.google.com/docs/database) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。

## Electron - [`@vueuse/electron`](https://vueuse.org/electron/README.html)

Electron renderer process modules for VueUse

- [`useIpcRenderer`](https://vueuse.org/electron/useIpcRenderer/) — 提供 [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 及其所有 API。
- [`useIpcRendererInvoke`](https://vueuse.org/electron/useIpcRendererInvoke/) — 响应式的 [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) 结果。使异步操作看起来像同步的。
- [`useIpcRendererOn`](https://vueuse.org/electron/useIpcRendererOn/) — 轻松使用 [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener)，并在组件卸载时自动移除监听器 [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener)。
- [`useZoomFactor`](https://vueuse.org/electron/useZoomFactor/) — 响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放因子。
- [`useZoomLevel`](https://vueuse.org/electron/useZoomLevel/) — 响应式的 [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) 缩放级别。

<!--ADDONS_LIST_ENDS-->
