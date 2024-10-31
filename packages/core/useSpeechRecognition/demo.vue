<script setup lang="ts">
import { useSpeechRecognition } from '@vueuse/core'
import { ref, watch } from 'vue'

const lang = ref('zh-CN')

// 随机从数组中选取指定数量的元素
function sample<T>(arr: T[], size: number) {
  const shuffled = arr.slice(0)
  let i = arr.length
  let temp: T
  let index: number
  while (i--) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(0, size)
}

// 颜色数组
const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow', 'transparent']

// 颜色语法
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`

// 使用语音识别
const speech = useSpeechRecognition({
  lang,
  continuous: true,
})

const color = ref('transparent')

if (speech.isSupported.value) {
  // @ts-expect-error 缺少类型
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  speech.recognition!.grammars = speechRecognitionList

  // 监听语音识别结果
  watch(speech.result, () => {
    for (const i of speech.result.value.toLowerCase().split(' ').reverse()) {
      if (colors.includes(i)) {
        color.value = i
        break
      }
    }
  })
}

// 随机选取的颜色数组
const sampled = ref<string[]>([])

// 开始语音识别
function start() {
  color.value = 'transparent'
  speech.result.value = ''
  sampled.value = sample(colors, 5)
  speech.start()
}

const { isListening, isSupported, stop, result } = speech

const selectedLanguage = ref(lang.value)
watch(lang, lang => isListening.value ? null : selectedLanguage.value = lang)
watch(isListening, isListening => isListening ? null : selectedLanguage.value = lang.value)
</script>

<template>
  <div>
    <div v-if="!isSupported">
      您的浏览器不支持语音识别 API，
      <a
        href="https://caniuse.com/mdn-api_speechrecognition"
        target="_blank"
      >查看更多详情</a>
    </div>
    <div v-else>
      <div space-x-4>
        <label class="radio">
          <input v-model="lang" type="radio" value="zh-CN">
          <span>普通话</span>
        </label>
        <label class="radio">
          <input v-model="lang" value="en-US" type="radio">
          <span>英语（美国）</span>
        </label>
        <label class="radio">
          <input v-model="lang" value="fr" type="radio">
          <span>法语</span>
        </label>
      </div>
      <button v-if="!isListening" @click="start">
        按住并讲话
      </button>
      <button v-if="isListening" class="orange" @click="stop">
        停止
      </button>
      <div v-if="isListening" class="mt-4">
        <template v-if="selectedLanguage === 'zh-CN'">
          <note class="mb-2">
            <b>请说一个颜色</b>
          </note>
          <note class="mb-2">
            尝试：{{ sampled.join(', ') }}
          </note>
        </template>

        <p v-else-if="selectedLanguage === 'en-US'">
          说一些英语！
        </p>

        <p v-else-if="selectedLanguage === 'fr'">
          说一些法语！
        </p>

        <p
          class="tag"
          :style="selectedLanguage === 'en-US' ? { background: color } : {}"
        >
          {{ result }}
        </p>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
.tag {
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 4px;
}
</style> -->

<style scoped lang="postcss">
input {
  --tw-ring-offset-width: 1px !important;
  --tw-ring-color: #8885 !important;
  --tw-ring-offset-color: transparent !important;
}

.radio {
  @apply inline-flex items-center my-auto cursor-pointer select-none;
}

.radio input {
  appearance: none;
  padding: 0;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  @apply bg-gray-400/30;
  @apply rounded-full h-4 w-4 select-none relative;
  @apply mr-1;
}

.radio input:checked::after {
  content: '';
  @apply absolute inset-[3px] rounded-full bg-primary;
}

.checkbox span {
  @apply ml-1.5 text-13px opacity-70;
}
</style>
