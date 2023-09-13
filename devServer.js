// eslint-disable-next-line import/no-extraneous-dependencies
import browserSync from 'browser-sync'
import buildAll from './generator/buildAll.js'

const server = browserSync.create('server')

const onSrcChange = async (event) => {
  if (event === 'change') {
    await buildAll()
    server.reload()
  }
}
const onInit = async (error) => {
  if (error) {
    console.error(error)
  } else {
    await buildAll()
    server.reload()
  }
}

server.watch('src/**', {}, onSrcChange)

server.init({ server: 'docs/', open: false }, onInit)
