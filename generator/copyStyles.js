import path from 'path'
import url from 'url'
import * as sass from 'sass'
import postcss from 'postcss'
import atImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import config from './config.js'
import { fileExt, getFileText, saveFile, getDirents } from './utils.js'

const copyStyles = async () => {
  let dirEnts = await getDirents(config.srcDir, false)
  dirEnts = dirEnts.filter((ent) => ent.isFile())

  if (dirEnts) {
    const validStyles = ['.css', '.sass', '.scss']

    // eslint-disable-next-line no-restricted-syntax
    for await (const ent of dirEnts) {
      const ext = fileExt(ent.name)
      let fileText = await getFileText(ent.path, ent.name)

      if (fileText && validStyles.includes(ext)) {
        const plugins = [autoprefixer]

        if (ent.name.endsWith('.scss') || ent.name.endsWith('.sass')) {
          const projectRoot = url.fileURLToPath(new URL('../', import.meta.url))
          const loadPaths = [path.join(projectRoot, config.srcDir)]
          try {
            fileText = sass.compileString(fileText, {
              loadPaths,
            }).css
            ent.name = ent.name.replace(ext, '.css')
          } catch (error) {
            console.error(error)
            // eslint-disable-next-line no-continue
            continue
          }
        } else if (ent.name.endsWith('.css')) {
          plugins.unshift(atImport)
        }

        postcss(plugins)
          .process(fileText, { from: `${ent.path}/${ent.name}` })
          .then(async (result) => {
            await saveFile(config.outDir, ent.name, result.css)
          })
      }
    }
  }
}

copyStyles()

export default copyStyles
