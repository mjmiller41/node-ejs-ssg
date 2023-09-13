import browserSync from 'browser-sync'
import { buildAll } from './generator/buildAll.js'

const onSrcChange = async (event, file) => {
  if (event === 'change') {
    await buildAll()
    server.reload()
  }
}
const onInit = async (error, bs) => {
  if (error) {
    console.error(error)
  } else {
    await buildAll()
    server.reload()
  }
}

const server = browserSync.create('server')

server.watch('src/**', {}, onSrcChange)

server.init({ server: 'docs/', open: false }, onInit)
