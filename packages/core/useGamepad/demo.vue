<script setup lang="ts">
import { useGamepad } from '@vueuse/core'
import Gamepad from './components/Gamepad.vue'

const { isSupported, gamepads } = useGamepad()
</script>

<template>
  <div>
    <div v-if="!isSupported" flex="~ row" place="items-center content-center" items="center" space="x-4">
      <i i-carbon-error text="5xl" opacity="50" />
      <div flex="~ col">
        <span text="2xl">此设备不支持游戏手柄。</span>
        <span opacity="70">似乎您的设备不支持游戏手柄 API。查看<a href="https://caniuse.com/gamepad">这里</a>以查看支持游戏手柄的设备列表。</span>
      </div>
    </div>
    <div v-else-if="gamepads.length === 0" flex="~ row" place="items-center content-center" items="center" space="x-4">
      <i i-carbon-game-console text="5xl" opacity="50" />
      <div flex="~ col">
        <span text="2xl">未检测到游戏手柄</span>
        <span opacity="50">确保您的游戏手柄已连接，并按下按钮唤醒它。</span>
      </div>
    </div>
    <div v-else space="y-4">
      <Gamepad v-for="gamepad in gamepads" :key="gamepad.id" :gamepad="gamepad" />
    </div>
  </div>
</template>
