import { mkdir, writeFile, readFile, readdir } from 'fs/promises'

const dotIndex = (filename) => {
  const index = filename.indexOf('.')
  if (index === -1) return 0
  return index - filename.length
}

const fileExt = (filename) => {
  return filename.slice(dotIndex(filename))
}

const getHtmlName = (filename) => {
  const ext = fileExt(filename)
  return filename.replace(ext, '.html')
}

const saveFile = async (path, name, data) => {
  try {
    await mkdir(path, { recursive: true })
    await writeFile(`${path}/${name}`, data)
    return 'success'
  } catch (error) {
    if (!(error.code === 'EEXIST')) console.error(error)
    return undefined
  }
}

const getFileText = async (path, name) => {
  const url = new URL(`../${path}/${name}`, import.meta.url)
  let fileText
  try {
    fileText = await readFile(url, 'utf-8')
  } catch (error) {
    console.error(error)
  }
  return fileText
}

const getDirents = async (path, recursive = false) => {
  let dirEnts
  try {
    dirEnts = await readdir(path, {
      withFileTypes: true,
      recursive,
    })
    return dirEnts
  } catch (error) {
    console.error(error)
  }
  return dirEnts
}

export { dotIndex, fileExt, getHtmlName, saveFile, getFileText, getDirents }
