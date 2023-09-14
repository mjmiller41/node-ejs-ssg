import yaml from 'js-yaml'
import config from './config.js'
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
    const module = await import(`../${path}/${name}`)
    value = module.default
  } else {
    const fileText = await getFileText(path, name)
    if (fileText) value = parseText(ext, fileText)
  }

  if (value) {
    const data = {}
    const key = name.replace(ext, '')
    data[key] = value
    return data
  }
  return undefined
}

const getDataFiles = async (srcDir = `${config.srcDir}${config.dataDir}`) => {
  const fileData = {}
  fileData.config = (await import('./config.js')).default
  const dirEnts = await getDirents(srcDir, true)
  if (dirEnts) {
    // eslint-disable-next-line no-restricted-syntax
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

export default getDataFiles
