import { copyFile, mkdir } from 'fs/promises'
import config from './config.js'
import { getDirents } from './utils.js'

const copyAssets = async (srcDir = `${config.srcDir}${config.assetsDir}`) => {
  const dirEnts = await getDirents(srcDir, true)

  // eslint-disable-next-line no-restricted-syntax
  for await (const ent of dirEnts) {
    if (ent.isFile()) {
      const outDir = ent.path.replace(config.srcDir, config.outDir)
      try {
        await mkdir(outDir, { recursive: true })
        await copyFile(`${ent.path}/${ent.name}`, `${outDir}/${ent.name}`)
      } catch (error) {
        console.error(error)
      }
    } else {
      await copyAssets(`${ent.path}/${ent.name}`)
    }
  }
}

export default copyAssets
// reload
