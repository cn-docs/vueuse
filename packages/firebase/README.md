# @vueuse/firebase

[![NPM version](https://img.shields.io/npm/v/@vueuse/firebase?color=a1b858)](https://www.npmjs.com/package/@vueuse/firebase)

Add-on of [VueUse](https://github.com/vueuse/vueuse), enables the real-time bindings for Firebase.

> ⚠️ This package only work with [Firebase 9 or above with the modular style](https://firebase.google.com/docs/web/modular-upgrade). For legacy versions, use `@vueuse/firebase@8` instead.

> 💡 Give a try to [VueFire](https://vuefire.vuejs.org/) if you are looking for a more complete solution!

## Install

```bash
npm i @vueuse/firebase firebase
```

## Functions

`@vueuse/firebase` provides the following functions

<!--GENERATED LIST, DO NOT MODIFY MANUALLY-->
<!--FUNCTIONS_LIST_STARTS-->

- [`useAuth`](https://vueuse.org/firebase/useAuth/) — 响应式的 [Firebase Auth](https://firebase.google.com/docs/auth) 绑定。它提供了一个响应式的 `user` 和 `isAuthenticated`，因此您可以轻松地对用户的身份验证状态变化做出反应。
- [`useFirestore`](https://vueuse.org/firebase/useFirestore/) — 响应式的 [Firestore](https://firebase.google.com/docs/firestore) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。
- [`useRTDB`](https://vueuse.org/firebase/useRTDB/) — 响应式的 [Firebase 实时数据库](https://firebase.google.com/docs/database) 绑定。使得**始终将本地数据与远程数据库同步**变得简单直观。

<!--FUNCTIONS_LIST_ENDS-->

## License

[MIT License](https://github.com/vueuse/vueuse/blob/master/LICENSE) © 2019-PRESENT [Anthony Fu](https://github.com/antfu)
