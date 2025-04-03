# Add-ons

The core package aims to be lightweight and dependence free. While the add-ons are wrapping popular packages into the consistent API style.

## Head - [`@vueuse/head`](https://github.com/vueuse/head) <carbon-link class="external-link"/>

Document head manager for Vue 3. SSR ready. Created and maintained by [@egoist](https://github.com/egoist)

## Motion - [`@vueuse/motion`](https://github.com/vueuse/motion) <carbon-link class="external-link"/>

**Vue Composables** putting your **components** in **motion**.

- 🏎 **Smooth animations** based on [**Popmotion**](https://popmotion.io/)
- 🎮 **Declarative** API
- 🚀 **Plug** & **play** with **10+ presets**
- 🚚 Supports **Nuxt** using [**nuxt-use-motion**](https://github.com/Tahul/nuxt-use-motion)
- ✨ Written in **TypeScript**
- 🏋️‍♀️ Lightweight with **<20kb** bundle size

> Created and maintained by [@Tahul](https://github.com/Tahul)

## Gesture - [`@vueuse/gesture`](https://github.com/vueuse/gesture) <carbon-link class="external-link"/>

**Vue Composables** making your app **interactive**

- 🚀 **Plug** & **play**
- 🕹 **Mouse** & **Touch** support
- 🎮 **Directives** support (**v-drag**, **v-pinch**, **v-move**...)
- ✨ Written in **TypeScript**
- 🤹 Plays well with [**vueuse/motion**](https://github.com/vueuse/motion) or **any other** animation solution

> Created and maintained by [@Tahul](https://github.com/Tahul)

## Sound - [`@vueuse/sound`](https://github.com/vueuse/sound) <carbon-link class="external-link"/>

Vue composables for playing sound effects.

- 👂 Lets your website **communicate** using 2 **human senses** instead of 1
- 🔥 Built with **Vue** Composition API
- 🚚 Supports **Nuxt 3** using [**@vueuse/sound/nuxt**](https://github.com/vueuse/sound#nuxt)
- ⚡️ **<1kb** bytes (gzip) in your **bundle**! **~10kb** loaded **async**.
- ✨ Built with **TypeScript**
- 🗣 Uses a powerful, battle-tested audio utility: [**Howler.js**](https://howlerjs.com/)

> Created and maintained by [@Tahul](https://github.com/Tahul)

## SchemaOrg - [`@vueuse/schema-org`](https://github.com/vueuse/schema-org) <carbon-link class="external-link"/>

Schema.org for Vue. Supports typed and automated Google Rich Results

- 😊 No Schema knowledge required, get up and running in minutes with minimal configuration
- ✨ 20+ Typed Schemas for best practice ([Google](https://developers.google.com/search/docs/advanced/structured-data/search-gallery), [Yoast](https://developer.yoast.com/features/schema/overview)) Rich Results
- 🧙 Automated Schema: `@id`, URL / date resolving, route meta and more
- 🤝 Integrations for [VitePress](https://vitepress.vue.com), [Nuxt](https://nuxtjs.org/), [Vitesse](https://nuxtjs.org/) and [Vite](https://vitejs.dev/) with auto-imports
- 🍞 Choose your preferred API: Composables or Components
- 🌳 SSR, tree-shaking and Schema inheritance ready

> Created and maintained by [@harlan-zw](https://github.com/harlan-zw)

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
- [`useSortable`](https://vueuse.org/integrations/useSortable/) — wrapper for [`sortable`](https://github.com/SortableJS/Sortable)

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
