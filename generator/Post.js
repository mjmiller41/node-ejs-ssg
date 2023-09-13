import { config } from './config.js'
import { Page } from './Page.js'
import { getDirents, getFileText } from './utils.js'

class Post extends Page {
  categories
  constructor(path, name) {
    super(path, name)
    this.outDir = `${config.outDir}${config.postsDir}`
  }

  getCategories() {
    // Convert categories attribute into array
    if (typeof this.categories === 'string') {
      this.categories = this.categories.split(',').map((str) => str.trim())
    } else if (!Array.isArray(this.categories)) {
      this.categories = []
    }
  }

  static async getPost(path, name) {
    if (Post.isValidFormat(name)) {
      const post = new Post(path, name)
      post.body = await getFileText(post.srcPath, post.srcName)
      post.getFrontMatter()
      post.getCategories()
      if (post.frontMatter && post.frontMatter.permalink) {
        post.url = `posts/${post.frontMatter.permalink}`
      } else {
        post.url = `posts/${post.outName}`
      }
      return post
    }
  }

  static getPosts = async () => {
    const dir = `${config.srcDir}${config.postsDir}`
    let posts = []
    const dirEnts = await getDirents(dir, false)
    if (dirEnts) {
      for await (const ent of dirEnts) {
        const post = await Post.getPost(ent.path, ent.name)
        if (post) posts.push(post)
      }
    }

    return posts
  }

  static getAllCategories = (posts) => {
    let categories = []
    for (const post of posts) {
      if (post.categories) {
        console.log(post.categories)
        const cats = post.categories.filter((cat) => !categories.includes(cat))
        categories = categories.concat(cats)
      }
    }
    return categories
  }
}

export { Post }
