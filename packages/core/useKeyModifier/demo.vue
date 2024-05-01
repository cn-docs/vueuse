<script setup lang="ts">
import { useKeyModifier } from '@vueuse/core'
import Key from '../useMagicKeys/Key.vue'

const capsLock = useKeyModifier('CapsLock')
const numLock = useKeyModifier('NumLock')
const scrollLock = useKeyModifier('ScrollLock')
const shift = useKeyModifier('Shift')
const control = useKeyModifier('Control')
const alt = useKeyModifier('Alt')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
    <Key :value="capsLock || false">
      大写锁定
    </Key>
    <Key :value="numLock || false">
      数字锁定
    </Key>
    <Key :value="scrollLock || false">
      滚动锁定
    </Key>
    <Key :value="shift || false">
      Shift
    </Key>
    <Key :value="control || false">
      Ctrl
    </Key>
    <Key :value="alt || false">
      Alt
    </Key>
  </div>
</template>
