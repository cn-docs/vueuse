---
category: Browser
---

# usePermission

响应式的 [权限 API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)。权限 API 提供了工具，使开发人员能够在权限方面实现更好的用户体验。

## 用法

```js
import { usePermission } from '@vueuse/core'

const microphoneAccess = usePermission('microphone')
```
