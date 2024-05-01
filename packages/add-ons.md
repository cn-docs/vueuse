# 附加功能

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

- [`useRouteHash`](https://vueuse.org/router/useRouteHash/) — shorthand for a reactive `route.hash`
- [`useRouteParams`](https://vueuse.org/router/useRouteParams/) — shorthand for a reactive `route.params`
- [`useRouteQuery`](https://vueuse.org/router/useRouteQuery/) — shorthand for a reactive `route.query`

## Integrations - [`@vueuse/integrations`](https://vueuse.org/integrations/README.html)

Integration wrappers for utility libraries

- [`useAsyncValidator`](https://vueuse.org/integrations/useAsyncValidator/) — wrapper for [`async-validator`](https://github.com/yiminghe/async-validator)
- [`useAxios`](https://vueuse.org/integrations/useAxios/) — wrapper for [`axios`](https://github.com/axios/axios)
- [`useChangeCase`](https://vueuse.org/integrations/useChangeCase/) — reactive wrapper for [`change-case`](https://github.com/blakeembrey/change-case)
- [`useCookies`](https://vueuse.org/integrations/useCookies/) — wrapper for [`universal-cookie`](https://www.npmjs.com/package/universal-cookie)
- [`useDrauu`](https://vueuse.org/integrations/useDrauu/) — reactive instance for [drauu](https://github.com/antfu/drauu)
- [`useFocusTrap`](https://vueuse.org/integrations/useFocusTrap/) — reactive wrapper for [`focus-trap`](https://github.com/focus-trap/focus-trap)
- [`useFuse`](https://vueuse.org/integrations/useFuse/) — easily implement fuzzy search using a composable with [Fuse.js](https://github.com/krisk/fuse)
- [`useIDBKeyval`](https://vueuse.org/integrations/useIDBKeyval/) — wrapper for [`idb-keyval`](https://www.npmjs.com/package/idb-keyval)
- [`useJwt`](https://vueuse.org/integrations/useJwt/) — wrapper for [`jwt-decode`](https://github.com/auth0/jwt-decode)
- [`useNProgress`](https://vueuse.org/integrations/useNProgress/) — reactive wrapper for [`nprogress`](https://github.com/rstacruz/nprogress)
- [`useQRCode`](https://vueuse.org/integrations/useQRCode/) — wrapper for [`qrcode`](https://github.com/soldair/node-qrcode)
- [`useSortable`](https://vueuse.org/integrations/useSortable/) — wrapper for [`sortable`](https://github.com/SortableJS/Sortable)

## RxJS - [`@vueuse/rxjs`](https://vueuse.org/rxjs/README.html)

Enables RxJS reactive functions in Vue

- [`from`](https://vueuse.org/rxjs/from/) — wrappers around RxJS's [`from()`](https://rxjs.dev/api/index/function/from) and [`fromEvent()`](https://rxjs.dev/api/index/function/fromEvent) to allow them to accept `ref`s
- [`toObserver`](https://vueuse.org/rxjs/toObserver/) — sugar function to convert a `ref` into an RxJS [Observer](https://rxjs.dev/guide/observer)
- [`useExtractedObservable`](https://vueuse.org/rxjs/useExtractedObservable/) — use an RxJS [`Observable`](https://rxjs.dev/guide/observable) as extracted from one or more composables
- [`useObservable`](https://vueuse.org/rxjs/useObservable/) — use an RxJS [`Observable`](https://rxjs.dev/guide/observable)
- [`useSubject`](https://vueuse.org/rxjs/useSubject/) — bind an RxJS [`Subject`](https://rxjs.dev/guide/subject) to a `ref` and propagate value changes both ways
- [`useSubscription`](https://vueuse.org/rxjs/useSubscription/) — use an RxJS [`Subscription`](https://rxjs.dev/guide/subscription) without worrying about unsubscribing from it or creating memory leaks
- [`watchExtractedObservable`](https://vueuse.org/rxjs/watchExtractedObservable/) — watch the values of an RxJS [`Observable`](https://rxjs.dev/guide/observable) as extracted from one or more composables

## Firebase - [`@vueuse/firebase`](https://vueuse.org/firebase/README.html)

Enables realtime bindings for Firebase

- [`useAuth`](https://vueuse.org/firebase/useAuth/) — reactive [Firebase Auth](https://firebase.google.com/docs/auth) binding
- [`useFirestore`](https://vueuse.org/firebase/useFirestore/) — reactive [Firestore](https://firebase.google.com/docs/firestore) binding
- [`useRTDB`](https://vueuse.org/firebase/useRTDB/) — reactive [Firebase Realtime Database](https://firebase.google.com/docs/database) binding

## Electron - [`@vueuse/electron`](https://vueuse.org/electron/README.html)

Electron renderer process modules for VueUse

- [`useIpcRenderer`](https://vueuse.org/electron/useIpcRenderer/) — 提供 [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 及其所有 API。
- [`useIpcRendererInvoke`](https://vueuse.org/electron/useIpcRendererInvoke/) — reactive [ipcRenderer.invoke API](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args) result
- [`useIpcRendererOn`](https://vueuse.org/electron/useIpcRendererOn/) — use [ipcRenderer.on](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener) with ease and [ipcRenderer.removeListener](https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovelistenerchannel-listener) automatically on unmounted
- [`useZoomFactor`](https://vueuse.org/electron/useZoomFactor/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom factor
- [`useZoomLevel`](https://vueuse.org/electron/useZoomLevel/) — reactive [WebFrame](https://www.electronjs.org/docs/api/web-frame#webframe) zoom level

<!--ADDONS_LIST_ENDS-->
