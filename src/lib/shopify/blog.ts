// ── Blog Service Functions ───────────────────────────────────────────────────

import { shopifyFetch } from './client'
import { GET_ALL_ARTICLES, GET_ARTICLE, GET_BLOGS } from './queries/blog'
import type { Article, Blog } from './types'

// ── Response shape helpers ───────────────────────────────────────────────────

interface ArticleEdge {
  node: Article
}

interface BlogNode {
  id: string
  handle: string
  title: string
  articles: { edges: ArticleEdge[] }
}

interface BlogEdge {
  node: BlogNode
}

interface GetAllArticlesData {
  blogs: { edges: BlogEdge[] }
}

interface GetArticleData {
  blogByHandle: (BlogNode & { articleByHandle: Article | null }) | null
}

interface GetBlogsData {
  blogs: { edges: BlogEdge[] }
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Fetch all articles across all blogs, flattened into a single array */
export async function getAllArticles(first = 20): Promise<Article[]> {
  try {
    const data = await shopifyFetch<GetAllArticlesData>(GET_ALL_ARTICLES, { first })
    return data.blogs.edges.flatMap(({ node: blog }) =>
      blog.articles.edges.map(({ node: article }) => ({
        ...article,
        blog: { handle: blog.handle, title: blog.title },
      }))
    )
  } catch (err) {
    console.error('[Shopify] getAllArticles error:', err)
    return []
  }
}

/** Fetch a single article by blog handle + article handle */
export async function getArticleByHandle(
  blogHandle: string,
  articleHandle: string
): Promise<Article | null> {
  try {
    const data = await shopifyFetch<GetArticleData>(GET_ARTICLE, {
      blogHandle,
      articleHandle,
    })
    const blog = data.blogByHandle
    if (!blog || !blog.articleByHandle) return null
    return {
      ...blog.articleByHandle,
      blog: { handle: blog.handle, title: blog.title },
    }
  } catch (err) {
    console.error('[Shopify] getArticleByHandle error:', err)
    return null
  }
}

/** Fetch a single blog with all its articles */
export async function getBlogByHandle(blogHandle: string): Promise<Blog | null> {
  try {
    const data = await shopifyFetch<GetBlogsData>(GET_BLOGS, { first: 10 })
    const blog = data.blogs.edges.find(({ node }) => node.handle === blogHandle)?.node
    if (!blog) return null
    return {
      id: blog.id,
      handle: blog.handle,
      title: blog.title,
      articles: blog.articles.edges.map(({ node }) => ({
        ...node,
        blog: { handle: blog.handle, title: blog.title },
      })),
    }
  } catch (err) {
    console.error('[Shopify] getBlogByHandle error:', err)
    return null
  }
}
