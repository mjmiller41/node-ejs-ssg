import fm from 'front-matter'
import { config } from './config.js'
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
    } else {
      return false
    }
  }

  getFrontMatter() {
    const matter = fm(this.body)
    this.body = matter.body
    Object.assign(this, matter.attributes)
  }

  async getLayout(layoutName) {
    let dirEnts = await getDirents(`${config.srcDir}${config.layoutDir}`, false)
    if (dirEnts) {
      for await (const ent of dirEnts) {
        if (Layout.isValidFormat(ent.name) && ent.name.includes(layoutName)) {
          const layout = new Layout(ent.path, ent.name)
          layout.body = await getFileText(layout.srcPath, layout.srcName)
          layout.getFrontMatter()
          return layout
        }
      }
    }
    return
  }
}

export { Layout }
