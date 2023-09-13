import { copyFile, mkdir, constants } from 'fs/promises'
import { config } from './config.js'
import { getDirents } from './utils.js'

const copyAssets = async (srcDir = '') => {
  if (!srcDir) srcDir = `${config.srcDir}${config.assetsDir}`

  const dirEnts = await getDirents(srcDir, true)
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

export { copyAssets }
// reload
