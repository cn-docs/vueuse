<script setup lang="ts">
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'

const text = ref()
const input = ref()
const button = ref()

const { focused: paragraphFocus } = useFocus(text)
const { focused: inputFocus } = useFocus(input, { initialValue: true })
const { focused: buttonFocus } = useFocus(button)
</script>

<template>
  <div>
    <p ref="text" class="demo-el px-2 rounded" tabindex="0">
      可获得焦点的段落
    </p>
    <input ref="input" class="demo-el" type="text" placeholder="可获得焦点的输入框">
    <button ref="button" class="demo-el button">
      可获得焦点的按钮
    </button>
    <hr>
    <note class="mb-2">
      <template v-if="paragraphFocus">
        段落获得焦点
      </template>
      <template v-else-if="inputFocus">
        输入框获得焦点
      </template>
      <template v-else-if="buttonFocus">
        按钮获得焦点
      </template>
      <template v-else>
        &nbsp;<!-- 避免段落在空时折叠 -->
      </template>
    </note>
    <button class="button small !ml-0" :class="{ orange: paragraphFocus }" @click="paragraphFocus = !paragraphFocus">
      聚焦文本
    </button>
    <button class="button small" :class="{ orange: inputFocus }" @click="inputFocus = !inputFocus">
      聚焦输入框
    </button>
    <button class="button small" :class="{ orange: buttonFocus }" @click="buttonFocus = !buttonFocus">
      聚焦按钮
    </button>
  </div>
</template>

<style scoped>
.demo-el:focus {
  opacity: 0.7;
  box-shadow: 0 0 2px 1px var(--vp-c-brand);
}
</style>
