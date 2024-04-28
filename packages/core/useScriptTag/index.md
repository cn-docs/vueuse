---
category: Browser
---

# useScriptTag

创建一个脚本标签，支持在组件卸载时自动卸载（删除）脚本标签。

如果给定 URL 的脚本标签已经存在，`useScriptTag()` 将不会创建另一个脚本标签，但请注意，根据您的使用方式，`useScriptTag()` 可能已经从之前的 `useScriptTag()` 调用中加载并卸载了该特定的 JS 文件。

## 用法

```ts
import { useScriptTag } from '@vueuse/core'

useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  // 当脚本标签加载完成时的回调。
  (el: HTMLScriptElement) => {
    // 做一些事情
  },
)
```

该脚本将在组件挂载时自动加载，并在组件卸载时删除。

## 配置

设置 `manual: true` 以手动控制加载脚本的时机。

```ts
import { useScriptTag } from '@vueuse/core'

const { scriptTag, load, unload } = useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  () => {
    // 做一些事情
  },
  { manual: true },
)

// 手动控制
await load()
await unload()
```
