import { resolve } from 'node:path'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import { currentVersion, versions } from '../../meta/versions'
import { addonCategoryNames, categoryNames, coreCategoryNames, metadata } from '../metadata/metadata'
import { transformHead } from './transformHead'
import viteConfig from './vite.config'

const Guide = [
  { text: '开始使用', link: '/guide/' },
  { text: '最佳实践', link: '/guide/best-practice' },
  { text: '配置', link: '/guide/config' },
  { text: '组件', link: '/guide/components' },
  { text: '贡献指南', link: '/contributing' },
  { text: '规范', link: '/guidelines' },
]

const CoreCategories = coreCategoryNames.map(c => ({
  text: c,
  activeMatch: '___', // never active
  link: `/functions#category=${c}`,
}))

const AddonCategories = [
  ...addonCategoryNames
    .map(c => ({
      text: c.slice(1),
      activeMatch: '___', // never active
      link: `/functions#category=${encodeURIComponent(c)}`,
    })),
]

const Links = [
  { text: '插件', link: '/add-ons' },
  { text: '生态系统', link: '/ecosystem' },
  { text: '导出大小', link: '/export-size' },
  { text: '最近更新', link: '/functions.html#sort=updated' },
  { text: '为什么没有翻译？', link: '/why-no-translations' },
]

const Learn = [
  { text: '付费视频课程', link: 'https://vueschool.io/courses/vueuse-for-everyone?friend=vueuse' },
  { text: '官方 Vue 认证', link: 'https://certification.vuejs.org/?utm_source=vueuse&utm_medium=website&utm_campaign=affiliate&utm_content=guide&banner_type=text&friend=VUEUSE' },
]

const Resources = [
  { text: '团队和贡献者', link: '/team' },
  { text: '学习', items: Learn },
]

const DefaultSideBar = [
  { text: '指南', items: Guide },
  { text: '核心函数', items: CoreCategories },
  { text: '插件', items: AddonCategories },
  { text: '学习', items: Learn },
  { text: '链接', items: Links },
]

const FunctionsSideBar = getFunctionsSideBar()

export default withPwa(defineConfig({
  title: 'VueUse',
  description: 'Collection of essential Vue Composition Utilities',
  lang: 'en-US',
  ignoreDeadLinks: true,

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      transformerTwoslash(),
    ],
  },

  themeConfig: {
    logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/vueuse/vueuse/tree/main/packages/:path',
      text: 'Suggest changes to this page',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-PRESENT Anthony Fu and VueUse contributors',
    },

    algolia: {
      appId: 'NBQWY48OOR',
      apiKey: 'c5fd82eb1100c2110c1690e0756d8ba5',
      indexName: 'vueuse',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vueuse/vueuse' },
      { icon: 'discord', link: 'https://chat.antfu.me' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/vueuse.org' },
    ],

    nav: [
      {
        text: '关于本站',
        link: '/guide/about',
      },
      {
        text: '指南',
        items: [
          { text: '指南', items: Guide },
          { text: '链接', items: Links },
        ],
      },
      {
        text: '函数',
        items: [
          {
            text: '',
            items: [
              { text: '所有函数', link: '/functions#' },
              { text: '最近更新', link: '/functions#sort=updated' },
            ],
          },
          { text: '核心', items: CoreCategories },
          { text: '插件', items: AddonCategories },
        ],
      },
      {
        text: '资源',
        items: Resources,
      },
      {
        text: '在线演示',
        link: 'https://play.vueuse.org',
      },
      {
        text: currentVersion,
        items: [
          {
            items: [
              { text: '发布说明', link: 'https://github.com/vueuse/vueuse/releases' },
            ],
          },
          {
            text: '版本',
            items: versions.map(i => i.version === currentVersion
              ? {
                  text: `${i.version} (Current)`,
                  activeMatch: '/', // always active
                  link: '/',
                }
              : {
                  text: i.version,
                  link: i.link!,
                }),
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': DefaultSideBar,
      '/contributing': DefaultSideBar,
      '/add-ons': DefaultSideBar,
      '/ecosystem': DefaultSideBar,
      '/guidelines': DefaultSideBar,
      '/export-size': DefaultSideBar,
      '/functions': FunctionsSideBar,
      '/core/': FunctionsSideBar,
      '/shared/': FunctionsSideBar,
      '/router/': FunctionsSideBar,
      '/electron/': FunctionsSideBar,
      '/rxjs/': FunctionsSideBar,
      '/integrations/': FunctionsSideBar,
      '/firebase/': FunctionsSideBar,
      '/math/': FunctionsSideBar,
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:title', content: 'VueUse' }],
    ['meta', { property: 'og:description', content: 'Collection of essential Vue Composition Utilities' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@antfu7' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
  ],

  transformHead,
  pwa: {
    outDir: resolve(__dirname, 'dist'),
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    srcDir: '.vitepress/',
    filename: 'sw.ts',
    injectRegister: 'inline',
    manifest: {
      id: '/',
      name: 'VueUse',
      short_name: 'VueUse',
      description: 'Collection of Essential Vue Composition Utilities',
      theme_color: '#ffffff',
      start_url: '/',
      lang: 'en-US',
      dir: 'ltr',
      orientation: 'natural',
      display: 'standalone',
      display_override: ['window-controls-overlay'],
      categories: ['development', 'developer tools'],
      icons: [
        {
          src: '/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/maskable-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      edge_side_panel: {
        preferred_width: 480,
      },
      screenshots: [{
        src: 'og.png',
        sizes: '1281x641',
        type: 'image/png',
        label: `Screenshot of VueUse`,
      }],
    },
    injectManifest: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}', 'hashmap.json'],
      globIgnores: ['og-*.png'],
    },
  },

  vite: viteConfig,
}))

function getFunctionsSideBar() {
  const links = []

  for (const name of categoryNames) {
    if (name.startsWith('_'))
      continue

    const functions = metadata.functions.filter(i => i.category === name && !i.internal)

    links.push({
      text: name,
      items: functions.map(i => ({
        text: i.name,
        link: i.external || `/${i.package}/${i.name}/`,
      })),
      link: name.startsWith('@')
        ? (functions[0].external || `/${functions[0].package}/README`)
        : undefined,
    })
  }

  return links
}
