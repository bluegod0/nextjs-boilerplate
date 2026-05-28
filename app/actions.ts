"use server"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import {
  COMMENT_BODY_MAX_LENGTH,
  POST_BODY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  normalizeText,
} from "@/lib/cafe"
import { db } from "@/lib/db"

export type ActionState = {
  error?: string
  success?: boolean
  postId?: string
  editToken?: string
}

function readValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export async function createPost(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = normalizeText(readValue(formData, "title"))
  const body = normalizeText(readValue(formData, "body"))

  if (!title) return { error: "Title is required." }
  if (!body) return { error: "Body is required." }
  if (title.length > TITLE_MAX_LENGTH) return { error: "Title is too long." }
  if (body.length > POST_BODY_MAX_LENGTH) return { error: "Body is too long." }

  try {
    const post = await db.post.create({
      data: {
        title,
        body,
      },
    })

    revalidatePath("/")

    return {
      success: true,
      postId: post.id,
    }
  } catch {
    return { error: "Something went wrong while saving the post." }
  }
}

export async function createComment(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const postId = readValue(formData, "postId")
  const body = normalizeText(readValue(formData, "body"))

  if (!postId) return { error: "Post is missing." }
  if (!body) return { error: "Comment is required." }
  if (body.length > COMMENT_BODY_MAX_LENGTH) {
    return { error: "Comment is too long." }
  }

  const post = await db.post.findUnique({
    where: { id: postId },
    select: { id: true },
  })

  if (!post) {
    return { error: "Post not found." }
  }

  const editToken = randomUUID()

  try {
    await db.comment.create({
      data: {
        postId,
        body,
        editToken,
      },
    })

    revalidatePath("/")
    revalidatePath(`/posts/${postId}`)

    return {
      success: true,
      postId,
      editToken,
    }
  } catch {
    return { error: "Something went wrong while saving the comment." }
  }
}

export async function updateComment(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const postId = readValue(formData, "postId")
  const commentId = readValue(formData, "commentId")
  const editToken = readValue(formData, "editToken")
  const body = normalizeText(readValue(formData, "body"))

  if (!postId || !commentId || !editToken) {
    return { error: "Comment could not be updated." }
  }
  if (!body) return { error: "Comment is required." }
  if (body.length > COMMENT_BODY_MAX_LENGTH) {
    return { error: "Comment is too long." }
  }

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      postId: true,
      editToken: true,
    },
  })

  if (!comment || comment.postId !== postId || comment.editToken !== editToken) {
    return { error: "Comment could not be updated." }
  }

  try {
    await db.comment.update({
      where: { id: commentId },
      data: { body },
    })

    revalidatePath("/")
    revalidatePath(`/posts/${postId}`)

    return {
      success: true,
      postId,
    }
  } catch {
    return { error: "Something went wrong while updating the comment." }
  }
}

export async function deleteComment(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const postId = readValue(formData, "postId")
  const commentId = readValue(formData, "commentId")
  const editToken = readValue(formData, "editToken")

  if (!postId || !commentId || !editToken) {
    return { error: "Comment could not be deleted." }
  }

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      postId: true,
      editToken: true,
    },
  })

  if (!comment || comment.postId !== postId || comment.editToken !== editToken) {
    return { error: "Comment could not be deleted." }
  }

  try {
    await db.comment.delete({
      where: { id: commentId },
    })

    revalidatePath("/")
    revalidatePath(`/posts/${postId}`)

    return {
      success: true,
      postId,
    }
  } catch {
    return { error: "Something went wrong while deleting the comment." }
  }
}
