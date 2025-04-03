<script setup lang="ts">
import { useSpeechSynthesis } from '@vueuse/core'
import { ref as deepRef, onMounted, shallowRef } from 'vue'

const voice = deepRef<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
const text = shallowRef('Hello, everyone! Good morning!')
const pitch = shallowRef(1)
const rate = shallowRef(1)

const speech = useSpeechSynthesis(text, {
  voice,
  pitch,
  rate,
  lang: 'zh-CN',
})

let synth: SpeechSynthesis

const voices = shallowRef<SpeechSynthesisVoice[]>([])

onMounted(() => {
  if (speech.isSupported.value) {
  // load at last
    setTimeout(() => {
      synth = window.speechSynthesis
      voices.value = synth.getVoices()
      voice.value = voices.value[0]
    })
  }
})

function play() {
  if (speech.status.value === 'pause') {
    console.log('resume')
    window.speechSynthesis.resume()
  }
  else {
    speech.speak()
  }
}

function pause() {
  window.speechSynthesis.pause()
}

function stop() {
  speech.stop()
}
</script>

<template>
  <div>
    <div v-if="!speech.isSupported">
      您的浏览器不支持语音合成 API，
      <a
        href="https://caniuse.com/mdn-api_speechsynthesis"
        target="_blank"
      >查看更多详情</a>
    </div>
    <div v-else>
      <label class="font-bold mr-2">朗读文本</label>
      <input v-model="text" class="!inline-block" type="text">

      <br>
      <label class="font-bold mr-2">语言</label>
      <div bg="$vp-c-bg" border="$vp-c-divider 1" inline-flex items-center relative rounded>
        <i i-carbon-language absolute left-2 opacity-80 pointer-events-none />
        <select v-model="voice" px-8 border-0 bg-transparent h-9 rounded appearance-none>
          <option bg="$vp-c-bg" disabled>
            选择语言
          </option>
          <option
            v-for="(voice, i) in voices"
            :key="i"
            bg="$vp-c-bg"
            :value="voice"
          >
            {{ `${voice.name} (${voice.lang})` }}
          </option>
        </select>
        <i i-carbon-chevron-down absolute right-2 opacity-80 pointer-events-none />
      </div>

      <br>
      <div inline-flex items-center>
        <label class="font-bold mr-2">音调</label>
        <div class="mt-1" inline-flex>
          <input v-model="pitch" type="range" min="0.5" max="2" step="0.1">
        </div>
      </div>

      <br>
      <div inline-flex items-center>
        <label class="font-bold mr-3">语速</label>
        <div class="mt-1" inline-flex>
          <input v-model="rate" type="range" min="0.5" max="2" step="0.1">
        </div>
      </div>

      <div class="mt-2">
        <button
          :disabled="speech.isPlaying.value"
          @click="play"
        >
          {{ speech.status.value === 'pause' ? '恢复' : '朗读' }}
        </button>
        <button :disabled="!speech.isPlaying.value" class="orange" @click="pause">
          暂停
        </button>
        <button :disabled="!speech.isPlaying.value" class="red" @click="stop">
          停止
        </button>
      </div>
    </div>
  </div>
</template>
