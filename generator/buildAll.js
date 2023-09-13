import { filters } from './filters.js'
import { Page } from './Page.js'
import { Post } from './Post.js'
import { getDataFiles } from './data.js'
import { render } from './render.js'
import { copyAssets } from './assets.js'
import { copyStyles } from './styles.js'

const buildAll = async () => {
  // Get pages data
  const pages = await Page.getPages()
  const posts = await Post.getPosts()

  const categories = Post.getAllCategories(posts)

  console.log(categories)

  const dataFiles = await getDataFiles()

  // Consolidate data
  const siteData = {
    pages: pages,
    posts: posts,
    categories: categories,
    ...dataFiles,
    ...filters,
  }

  // Render files to html and write to outDir
  await render(pages, siteData)
  await render(posts, siteData)

  // Copy static files
  await copyAssets()
  await copyStyles()
}

export { buildAll }
