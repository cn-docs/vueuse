---
category: Browser
---

# useShare

响应式 [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)。浏览器提供了可以分享文本或文件内容的功能。

> 必须在用户操作（如按钮点击）之后调用 `share` 方法。不能在页面加载时简单地调用它。这是为了防止滥用而设定的。

## 用法

```js
import { useShare } from '@vueuse/core'

const { share, isSupported } = useShare()

function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href,
  })
}
```

### 传递源引用

你可以传递一个 `ref`，源引用的更改将反映到你的分享选项中。

```ts {7}
import { ref } from 'vue'

const shareOptions = ref<ShareOptions>({ text: 'foo' })
const { share, isSupported } = useShare(shareOptions)

shareOptions.value.text = 'bar'

share()
```
