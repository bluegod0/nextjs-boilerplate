"use client"

import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteComment, updateComment, type ActionState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { COMMENT_TOKEN_KEY, type CafeComment } from "@/lib/cafe"

const initialState: ActionState = {}

function readStoredTokens() {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(COMMENT_TOKEN_KEY) ?? "[]")
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : []
  } catch {
    return []
  }
}

function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export function CommentThread({
  postId,
  comments,
}: {
  postId: string
  comments: CafeComment[]
}) {
  const [ownedTokens, setOwnedTokens] = useState<string[]>([])

  useEffect(() => {
    const syncTokens = () => setOwnedTokens(readStoredTokens())

    syncTokens()
    window.addEventListener("storage", syncTokens)
    window.addEventListener("anonymous-comment-tokens-changed", syncTokens)

    return () => {
      window.removeEventListener("storage", syncTokens)
      window.removeEventListener("anonymous-comment-tokens-changed", syncTokens)
    }
  }, [])

  const ownedCommentIds = useMemo(() => {
    return new Set(
      comments
        .filter((comment) => ownedTokens.includes(comment.editToken))
        .map((comment) => comment.id)
    )
  }, [comments, ownedTokens])

  if (comments.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
        No comments yet. Be the first to leave one.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          postId={postId}
          comment={comment}
          owned={ownedCommentIds.has(comment.id)}
        />
      ))}
    </div>
  )
}

function CommentCard({
  postId,
  comment,
  owned,
}: {
  postId: string
  comment: CafeComment
  owned: boolean
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <article className="rounded-2xl border bg-card p-4 shadow-sm">
      {isEditing ? (
        <CommentEditForm
          postId={postId}
          comment={comment}
          onDone={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p className="whitespace-pre-wrap text-sm leading-6">{comment.body}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={new Date(comment.createdAt).toISOString()}>
              {formatDateTime(comment.createdAt)}
            </time>
            {owned ? (
              <div className="ml-auto flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <DeleteCommentForm
                  postId={postId}
                  comment={comment}
                  onDeleted={() => setIsEditing(false)}
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </article>
  )
}

function CommentEditForm({
  postId,
  comment,
  onDone,
}: {
  postId: string
  comment: CafeComment
  onDone: () => void
}) {
  const router = useRouter()
  const handledSuccess = useRef(false)
  const [state, formAction, pending] = useActionState(updateComment, initialState)

  useEffect(() => {
    if (pending) {
      handledSuccess.current = false
      return
    }

    if (!state.success) {
      handledSuccess.current = false
      return
    }

    if (handledSuccess.current) {
      return
    }

    handledSuccess.current = true
    onDone()
    router.refresh()
  }, [onDone, pending, router, state.success])

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="commentId" value={comment.id} />
      <input type="hidden" name="editToken" value={comment.editToken} />

      <textarea
        name="body"
        defaultValue={comment.body}
        required
        maxLength={300}
        rows={4}
        className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-ring"
      />

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function DeleteCommentForm({
  postId,
  comment,
  onDeleted,
}: {
  postId: string
  comment: CafeComment
  onDeleted: () => void
}) {
  const router = useRouter()
  const handledSuccess = useRef(false)
  const [state, formAction, pending] = useActionState(deleteComment, initialState)

  useEffect(() => {
    if (pending) {
      handledSuccess.current = false
      return
    }

    if (!state.success) {
      handledSuccess.current = false
      return
    }

    if (handledSuccess.current) {
      return
    }

    handledSuccess.current = true
    onDeleted()
    router.refresh()
  }, [onDeleted, pending, router, state.success])

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="commentId" value={comment.id} />
      <input type="hidden" name="editToken" value={comment.editToken} />

      <Button type="submit" variant="outline" size="sm" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>

      {state.error ? <p className="mt-2 text-xs text-red-600">{state.error}</p> : null}
    </form>
  )
}
