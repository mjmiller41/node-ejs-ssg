/* eslint-disable no-restricted-syntax */
import Layout from './Layout.js'
import config from './config.js'
import { getHtmlName, fileExt, getFileText, getDirents } from './utils.js'

class Page extends Layout {
  outName
  outDir
  constructor(path, name) {
    super(path, name)
    this.outName = getHtmlName(this.srcName)
    this.outDir = config.outDir
  }

  static isValidFormat(filename) {
    const validExts = ['.html', '.md', '.markdown', '.ejs']
    if (validExts.includes(fileExt(filename)) && filename[0] !== '_') {
      return true
    }
    return false
  }

  static async getPage(path, name) {
    let page
    if (Page.isValidFormat(name)) {
      page = new Page(path, name)
      page.body = await getFileText(page.srcPath, page.srcName)
      page.getFrontMatter()
      if (page.permalink) {
        page.url = page.permalink
      } else {
        page.url = page.outName
      }
    }
    return page
  }

  static async getPages() {
    const pageDirs = [config.srcDir, `${config.srcDir}${config.pagesDir}`]
    const pages = []

    for await (const dir of pageDirs) {
      const dirEnts = await getDirents(dir, false)
      if (dirEnts) {
        for await (const ent of dirEnts) {
          const page = await Page.getPage(ent.path, ent.name)
          if (page) pages.push(page)
        }
      }
    }
    return pages
  }
}

export default Page
