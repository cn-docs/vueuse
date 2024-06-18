---
category: '@Integrations'
---

# useJwt

[`jwt-decode`](https://github.com/auth0/jwt-decode) 的封装。

## 安装

```bash
npm install jwt-decode@^4
```

## 使用方法

```typescript
import { defineComponent, ref } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'

export default defineComponent({
  setup() {
    const encodedJwt = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc')
    const { header, payload } = useJwt(encodedJwt)

    return { header, payload }
  },
})
```
