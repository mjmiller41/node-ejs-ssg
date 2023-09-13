import path from 'path'
import url from 'url'
import ejs from 'ejs'
import { saveFile } from './utils.js'
import { Page } from './Page.js'
import { Post } from './Post.js'

const renderFile = async (page, siteData) => {
  const __dirname = url.fileURLToPath(new URL('../', import.meta.url))
  const rootDir = path.join(__dirname, `${page.srcPath}`)

  if (page instanceof Page || page instanceof Post) {
    siteData.page = page
  }
  const ejsConfig = { root: rootDir, filename: page.srcName }
  let html = ejs.render(page.body, siteData, ejsConfig).trim()

  if (page.layout) {
    const layout = await page.getLayout(page.layout)
    html = await renderFile(layout, { ...siteData, content: html })
  }

  return html
}

const render = async (pages, siteData) => {
  for await (const page of pages) {
    page.body = await renderFile(page, siteData)
    if (page.permalink) {
      await saveFile(`${page.outDir}${page.permalink}`, 'index.html', page.body)
    } else {
      await saveFile(page.outDir, page.outName, page.body)
    }
  }
  return
}

export { render }
