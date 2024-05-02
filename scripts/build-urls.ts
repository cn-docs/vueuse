import fs from 'fs-extra'

// 站点地图文件路径
const sitemapFilePath = 'packages/.vitepress/dist/sitemap.xml'
// 要写入的文件路径
const outputFilePath = 'urls.txt'
// 收录
// 读取站点地图文件内容
fs.readFile(sitemapFilePath, 'utf8')
  .then((data) => {
    // 使用正则表达式匹配 URL
    const urls = data.match(/<loc>(.*?)<\/loc>/g).map(url => url.replace('<loc>', '').replace('</loc>', ''))

    // 将提取的 URL 写入文件
    return fs.writeFile(outputFilePath, urls.join('\n'))
  })
  .then(() => {
    console.log('URLs have been successfully written to', outputFilePath)
  })
  .catch((err) => {
    console.error('Failed to read or write files:', err)
  })
