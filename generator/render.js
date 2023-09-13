import path from 'path'
import url from 'url'
import ejs from 'ejs'
import { saveFile } from './utils.js'
import Page from './Page.js'
import Post from './Post.js'
import Layout from './Layout.js'

const renderFile = async (page, siteData) => {
  const dirname = url.fileURLToPath(new URL('../', import.meta.url))
  const rootDir = path.join(dirname, `${page.srcPath}`)
  const data = { ...siteData }

  if (page instanceof Page || page instanceof Post) {
    data.page = page
  }
  const ejsConfig = { root: rootDir, filename: page.srcName }
  let html = ejs.render(page.body, data, ejsConfig).trim()

  if (page.layout) {
    const layout = await Layout.getLayout(page.layout)
    html = await renderFile(layout, { ...data, content: html })
  }

  return html
}

const render = async (pages, siteData) => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const page of pages) {
    page.body = await renderFile(page, siteData)
    if (page.permalink) {
      await saveFile(`${page.outDir}${page.permalink}`, 'index.html', page.body)
    } else {
      await saveFile(page.outDir, page.outName, page.body)
    }
  }
}

export default render
