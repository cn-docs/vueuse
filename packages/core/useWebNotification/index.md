---
category: Browser
---

# useWebNotification

响应式 [Notification](https://developer.mozilla.org/en-US/docs/Web/API/notification)

Web Notification 接口用于配置和显示桌面通知给用户。

## 用法

```ts
const {
  isSupported,
  notification,
  show,
  close,
  onClick,
  onShow,
  onError,
  onClose,
} = useWebNotification({
  title: 'Hello, VueUse world!',
  dir: 'auto',
  lang: 'en',
  renotify: true,
  tag: 'test',
})

if (isSupported.value)
  show()
```

这个组合式还利用了 `@vueuse/shared` 中的 `createEventHook` 工具:

```ts
onClick((evt: Event) => {
  // 处理通知的点击事件...
})

onShow((evt: Event) => {
  // 处理通知的显示事件...
})

onError((evt: Event) => {
  // 处理通知的错误事件...
})

onClose((evt: Event) => {
  // 处理通知的关闭事件...
})
```
