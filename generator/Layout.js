import fm from 'front-matter'
import config from './config.js'
import { getDirents, fileExt, getFileText } from './utils.js'

class Layout {
  srcName
  srcPath
  body
  constructor(path, name) {
    this.srcName = name
    this.srcPath = path
  }

  static isValidFormat(filename) {
    if (fileExt(filename) === '.ejs') {
      return true
    }
    return false
  }

  getFrontMatter() {
    const matter = fm(this.body)
    this.body = matter.body
    Object.assign(this, matter.attributes)
  }

  static async getLayout(layoutName) {
    let layout
    const dirEnts = await getDirents(
      `${config.srcDir}${config.layoutDir}`,
      false
    )
    // eslint-disable-next-line no-restricted-syntax
    for await (const ent of dirEnts) {
      if (Layout.isValidFormat(ent.name) && ent.name.includes(layoutName)) {
        layout = new Layout(ent.path, ent.name)
        layout.body = await getFileText(layout.srcPath, layout.srcName)
        layout.getFrontMatter()
      }
    }
    return layout
  }
}

export default Layout
