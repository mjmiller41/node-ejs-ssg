/* eslint-disable no-restricted-syntax */
import path from 'path'
import url from 'url'
import ejs from 'ejs'
import { saveFile } from './utils.js'
import Page from './Page.js'
import Post from './Post.js'
import Layout from './Layout.js'
import config from './config.js'

const renderPage = async (page, siteData) => {
  const pg = { ...page }
  const data = { ...siteData }
  const dirname = url.fileURLToPath(new URL('../', import.meta.url))
  const rootDir = path.join(dirname, `${pg.srcPath}`)

  if (page instanceof Page || page instanceof Post) {
    data.page = pg
  }
  const ejsConfig = { root: rootDir, filename: pg.srcName }
  const html = ejs.render(pg.body, data, ejsConfig).trim()

  if (pg.layout) {
    let layout = await Layout.getLayout(pg.layout)
    layout = await renderPage(layout, { ...data, content: html })
    pg.body = layout.body
  } else {
    pg.body = html
  }
  return pg
}

const renderPages = (pages, siteData) => {
  const renderedPages = []
  for (const key in pages) {
    if (Object.hasOwn(pages, key)) {
      renderedPages.push(renderPage(pages[key], siteData))
    }
  }
  return Promise.all(renderedPages)
}

const savePages = (pages) => {
  const results = []
  for (const key in pages) {
    if (Object.hasOwn(pages, key)) {
      const page = { ...pages[key] }
      if (page.permalink && config.usePermalinks) {
        results.push(
          saveFile(`${page.outDir}/${page.permalink}`, 'index.html', page.body)
        )
      } else {
        results.push(saveFile(page.outDir, page.outName, page.body))
      }
    }
  }
  return Promise.all(results)
}

const render = async (pages, siteData) => {
  const renderedPages = await renderPages(pages, siteData)

  await savePages(renderedPages)
}

export default render
