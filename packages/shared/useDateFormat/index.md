---
category: Time
---

# useDateFormat

根据传入的令牌字符串获取格式化日期，灵感来自 [dayjs](https://github.com/iamkun/dayjs)。

**所有可用格式的列表（默认为 HH:mm:ss）：**

| 格式   | 输出                     | 描述                   |
| ------ | ------------------------ | ---------------------- |
| `Yo`   | 2018th                   | 序数格式化年份         |
| `YY`   | 18                       | 两位数年份             |
| `YYYY` | 2018                     | 四位数年份             |
| `M`    | 1-12                     | 月份，从1开始          |
| `Mo`   | 1st, 2nd, ..., 12th      | 月份，序数格式化       |
| `MM`   | 01-12                    | 月份，两位数           |
| `MMM`  | Jan-Dec                  | 缩写月份名             |
| `MMMM` | January-December         | 完整月份名             |
| `D`    | 1-31                     | 日期                   |
| `Do`   | 1st, 2nd, ..., 31st      | 日期，序数格式化       |
| `DD`   | 01-31                    | 日期，两位数           |
| `H`    | 0-23                     | 小时                   |
| `Ho`   | 0th, 1st, 2nd, ..., 23rd | 小时，序数格式化       |
| `HH`   | 00-23                    | 小时，两位数           |
| `h`    | 1-12                     | 小时，12小时制         |
| `ho`   | 1st, 2nd, ..., 12th      | 小时，12小时制，排序   |
| `hh`   | 01-12                    | 小时，12小时制，两位数 |
| `m`    | 0-59                     | 分钟                   |
| `mo`   | 0th, 1st, ..., 59th      | 分钟，序数格式化       |
| `mm`   | 00-59                    | 分钟，两位数           |
| `s`    | 0-59                     | 秒                     |
| `so`   | 0th, 1st, ..., 59th      | 秒，序数格式化         |
| `ss`   | 00-59                    | 秒，两位数             |
| `SSS`  | 000-999                  | 毫秒，三位数           |
| `A`    | AM PM                    | 上午下午               |
| `AA`   | A.M. P.M.                | 上午下午，周期         |
| `a`    | am pm                    | 上午下午，小写         |
| `aa`   | a.m. p.m.                | 上午下午，小写和周期   |
| `d`    | 0-6                      | 星期几，星期日为0      |
| `dd`   | S-S                      | 星期几的简写           |
| `ddd`  | Sun-Sat                  | 星期几的简写           |
| `dddd` | Sunday-Saturday          | 星期几的全名           |

- 可通过在 `options` 中定义 `customMeridiem` 来自定义上午下午。

## 使用

### 基本用法

```vue
<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <div>{{ formatted }}</div>
</template>
```

### 使用语言环境

```vue
<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD (ddd)', { locales: 'en-US' })
</script>

<template>
  <div>{{ formatted }}</div>
</template>
```

### 使用自定义上午下午

```vue
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

function customMeridiem(hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) {
  const m = hours > 11 ? (isLowercase ? 'μμ' : 'ΜΜ') : (isLowercase ? 'πμ' : 'ΠΜ')
  return hasPeriod ? m.split('').reduce((acc, current) => acc += `${current}.`, '') : m
}

const am = useDateFormat('2022-01-01 05:05:05', 'hh:mm:ss A', { customMeridiem })
// am.value = '05:05:05 ΠΜ'
const pm = useDateFormat('2022-01-01 17:05:05', 'hh:mm:ss AA', { customMeridiem })
// pm.value = '05:05:05 Μ.Μ.'
</script>
```
