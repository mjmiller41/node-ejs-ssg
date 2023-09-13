import yaml from 'js-yaml'
import { readdir } from 'fs/promises'
import { config } from './config.js'
import { fileExt, getDirents, getFileText } from './utils.js'

const parseText = (ext, text) => {
  let parsedText
  switch (ext) {
    case '.json':
      parsedText = JSON.parse(text)
      break
    case '.yaml':
    case '.yml':
      parsedText = yaml.load(text, { json: true })
      parsedText = JSON.parse(JSON.stringify(parsedText))
      break
    default:
      console.error(`Unable to parse ${ext} files.`)
      parsedText = undefined
      break
  }
  return parsedText
}

const getFileData = async (path, name) => {
  let value
  const ext = fileExt(name)

  if (ext === '.js') {
    let module = await import(`../${path}/${name}`)
    value = module.default
  } else {
    const fileText = await getFileText(path, name)
    if (fileText) value = parseText(ext, fileText)
  }

  if (value) {
    let data = {}
    const key = name.replace(ext, '')
    data[key] = value
    return data
  } else {
    return undefined
  }
}

const getDataFiles = async (srcDir = '') => {
  if (!srcDir) srcDir = `${config.srcDir}${config.dataDir}`
  let fileData = {}
  const dirEnts = await getDirents(srcDir, true)
  if (dirEnts) {
    for await (const ent of dirEnts) {
      if (ent.isFile()) {
        const fd = await getFileData(ent.path, ent.name)
        Object.assign(fileData, fd)
      } else {
        fileData[ent.name] = await getDataFiles(`${ent.path}/${ent.name}`)
      }
    }
  }
  return fileData
}

export { getDataFiles }
