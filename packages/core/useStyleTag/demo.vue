<script setup lang="ts">
import { useStyleTag } from '@vueuse/core'

const customCSS = `
.demo { background: #ad4c2e50; }
.demo textarea { background: lightyellow; }
`.trim()

const { id, css, load, unload, isLoaded } = useStyleTag(customCSS)
</script>

<template>
  <div>
    编辑 CSS：
    <textarea v-model="css" type="text" rows="2" class="w-full" />
  </div>
  <button :disabled="isLoaded" @click="load">
    加载
  </button>
  <button class="orange" :disabled="!isLoaded" @click="unload">
    卸载
  </button>
  <div class="usestyle-demo">
    <p>ID：<code>{{ id }}</code></p>
    <p>已加载：<code>{{ isLoaded }}</code></p>
  </div>
</template>
