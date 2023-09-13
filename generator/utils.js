import { Dirent } from 'fs'
import { mkdir, writeFile, readFile, readdir } from 'fs/promises'

const dotIndex = (filename) => {
  let dotIndex = filename.indexOf('.')
  // If file has no file extension do not render
  if (dotIndex == -1) return 0
  return dotIndex - filename.length
}

const fileExt = (filename) => {
  const fileExt = filename.slice(dotIndex(filename))
  return fileExt === filename ? '' : fileExt
}

const getHtmlName = (filename) => {
  const ext = fileExt(filename)
  return filename.replace(ext, '.html')
}

const saveFile = async (path, name, data) => {
  try {
    await mkdir(path, { recursive: true })
    await writeFile(`${path}/${name}`, data)
    console.log(`${name} has been written to ${path}`)
  } catch (error) {
    if (!(error.code === 'EEXIST')) console.error(error)
  }
  return
}

const getFileText = async (path, name) => {
  const url = new URL(`../${path}/${name}`, import.meta.url)
  let fileText
  try {
    fileText = await readFile(url, 'utf-8')
  } catch (error) {
    console.log(url.pathname, path, name)
    console.error(error)
  }
  return fileText
}

const getDirents = async (path, recursive = false) => {
  try {
    let dirEnts = await readdir(path, {
      withFileTypes: true,
      recursive: recursive,
    })
    return dirEnts
  } catch (error) {
    console.error(error)
    return
  }
}

const copyFile = () => {}

export { dotIndex, fileExt, getHtmlName, saveFile, getFileText, getDirents }
