import type { VueUseFunction } from '@vueuse/metadata'

export const head: VueUseFunction[] = [
  {
    name: 'createHead',
    package: 'head',
    description: '用于创建 Head Manager 实例。',
    category: '@Head',
    external: 'https://github.com/vueuse/head#api',
  },
  {
    name: 'useHead',
    package: 'head',
    description: '用于更新 head meta 标记。',
    category: '@Head',
    external: 'https://github.com/vueuse/head#api',
  },
]

const motionDefaults = {
  package: 'motion',
  category: '@Motion',
}

export const motion: VueUseFunction[] = [
  {
    ...motionDefaults,
    name: 'useMotion',
    description: '使您的组件拥有动效。',
    external: 'https://motion.vueuse.org/api/use-motion',
  },
  {
    ...motionDefaults,
    name: 'useSpring',
    description: 'spring 动画。',
    external: 'https://motion.vueuse.org/api/use-spring',
  },
  {
    ...motionDefaults,
    name: 'useMotionProperties',
    description: '用于访问目标元素的 Motion 属性。',
    external: 'https://motion.vueuse.org/api/use-motion-properties.html',
  },
  {
    ...motionDefaults,
    name: 'useMotionVariants',
    description: '用于处理 Variants 状态和选择。',
    external: 'https://motion.vueuse.org/api/use-motion-variants',
  },
  {
    ...motionDefaults,
    name: 'useElementStyle',
    description: '用于将响应式对象同步到目标元素 CSS 样式。',
    external: 'https://motion.vueuse.org/api/use-element-style',
  },
  {
    ...motionDefaults,
    name: 'useElementTransform',
    description: '用于将反应式对象同步到目标元素 CSS 转换。',
    external: 'https://motion.vueuse.org/api/use-element-transform',
  },
]

export const sound: VueUseFunction[] = [
  {
    name: 'useSound',
    package: 'sound',
    description: '用于播放音效。',
    category: '@Sound',
    external: 'https://github.com/vueuse/sound#examples',
  },
]

export const schemaOrg: VueUseFunction[] = [
  {
    name: 'createSchemaOrg',
    package: 'schema-org',
    description: '创建 schema.org Manager 实例。',
    category: '@SchemaOrg',
    external: 'https://vue-schema-org.netlify.app/api/core/create-schema-org.html',
  },
  {
    name: 'useSchemaOrg',
    package: 'schema-org',
    description: '用于更新 schema.org.',
    category: '@SchemaOrg',
    external: 'https://vue-schema-org.netlify.app/api/core/use-schema-org.html',
  },
]

export const ecosystemFunctions = [
  ...head,
  ...motion,
  ...schemaOrg,
  ...sound,
]
