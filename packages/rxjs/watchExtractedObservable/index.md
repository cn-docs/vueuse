---
category: '@RxJS'
---

# watchExtractedObservable

监视从一个或多个组合式中提取的 RxJS [`Observable`](https://rxjs.dev/guide/observable) 的值。

在可观察对象发生变化时自动取消订阅，并在组件卸载时自动取消订阅。

支持与 [`watch`](https://cn.vuejs.org/guide/essentials/watchers#basic-example) 的所有重载签名匹配的签名。

## 用法

```ts
import { watchExtractedObservable } from '@vueuse/rxjs'
import { computed, reactive, shallowRef } from 'vue'
import { AudioPlayer } from '../my/libs/AudioPlayer'

// setup()

const audio = shallowRef<HTMLAudioElement>()
const player = computed(() => (audio.value ? new AudioPlayer(audio) : null))
const state = reactive({
  progress: 0,
})

watchExtractedObservable(player, p => p.progress$, (percentage) => {
  state.progress = percentage * 100
})
```

如果您想要为可能出错的 `Observable` 添加自定义错误处理，您可以提供一个可选的 `onError` 配置。如果没有提供，RxJS 将把提供的 observable 中的任何错误视为"未处理的错误"，并且它将在一个新的调用栈中抛出，并报告给 `window.onerror`（或者如果您恰好在 Node 中，则为 `process.on('error')`）。

您还可以提供一个可选的 `onComplete` 配置，如果需要在观察到的可观察对象完成时附加特殊行为。

```ts
import { watchExtractedObservable } from '@vueuse/rxjs'
import { computed, reactive, shallowRef } from 'vue'
import { AudioPlayer } from '../my/libs/AudioPlayer'

// setup()

const audio = shallowRef<HTMLAudioElement>()
const player = computed(() => (audio.value ? new AudioPlayer(audio) : null))
const state = reactive({
  progress: 0,
})

watchExtractedObservable(player, p => p.progress$, (percentage) => {
  state.progress = percentage * 100
}, {
  onError: (err: unknown) => {
    console.error(err)
  },
  onComplete: () => {
    state.progress = 100 // 或者 0，或者其他任何值
  },
})
```

如果需要，您还可以将 `watch` 选项作为最后一个参数传递：

```ts
import { watchExtractedObservable } from '@vueuse/rxjs'
import { computed, reactive, shallowRef } from 'vue'
import { AudioPlayer } from '../my/libs/AudioPlayer'

// setup()

const audio = shallowRef<HTMLAudioElement>()
const player = computed(() => (audio.value ? new AudioPlayer(audio) : null))
const state = reactive({
  progress: 0,
})

watchExtractedObservable(player, p => p.progress$, (percentage) => {
  state.progress = percentage * 100
}, {
  onError: (err: unknown) => {
    console.error(err)
  }
}, {
  immediate: true
})
```
