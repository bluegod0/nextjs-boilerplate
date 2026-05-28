import { db } from "@/lib/db"

export const TITLE_MAX_LENGTH = 80
export const POST_BODY_MAX_LENGTH = 1000
export const COMMENT_BODY_MAX_LENGTH = 300
export const COMMENT_TOKEN_KEY = "anonymous-comment-edit-tokens"

export type CafePostListItem = {
  id: string
  title: string
  body: string
  createdAt: Date | string
  commentCount: number
}

export type CafeComment = {
  id: string
  editToken: string
  body: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type CafePostDetail = {
  id: string
  title: string
  body: string
  createdAt: Date | string
  updatedAt: Date | string
  comments: CafeComment[]
}

export function normalizeText(value: string) {
  return value.trim()
}

export async function listPosts(): Promise<CafePostListItem[]> {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    createdAt: post.createdAt,
    commentCount: post._count.comments,
  }))
}

export async function getPost(id: string): Promise<CafePostDetail | null> {
  const post = await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      updatedAt: true,
      comments: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          editToken: true,
          body: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  })

  return post
}
