/* eslint-disable no-restricted-syntax */
import { Marked } from 'marked'
import config from './config.js'
import Page from './Page.js'
import { getDirents, getFileText } from './utils.js'

const marked = new Marked()

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
    let post
    if (Post.isValidFormat(name)) {
      post = new Post(path, name)
      post.body = await getFileText(post.srcPath, post.srcName)
      post.getFrontMatter()
      post.body = marked.parse(post.body)
      post.getCategories()
      if (post && post.permalink) {
        post.url = `/posts/${post.permalink}`
      } else {
        post.url = `/posts/${post.outName}`
      }
    }
    return post
  }

  static getPosts = async () => {
    const dir = `${config.srcDir}${config.postsDir}`
    const posts = []
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
    const allCategories = []
    for (const post of posts) {
      if (post.categories.length > 0) {
        for (const category of post.categories) {
          if (!allCategories.includes(category)) allCategories.push(category)
        }
      }
    }
    return allCategories
  }
}

export default Post
