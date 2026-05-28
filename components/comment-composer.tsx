"use client"

import { useActionState, useEffect, useRef } from "react"
import { createComment, type ActionState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { COMMENT_TOKEN_KEY } from "@/lib/cafe"
import { useRouter } from "next/navigation"

const initialState: ActionState = {}

export function CommentComposer({ postId }: { postId: string }) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const handledSuccess = useRef(false)
  const [state, formAction, pending] = useActionState(createComment, initialState)

  useEffect(() => {
    if (pending) {
      handledSuccess.current = false
      return
    }

    if (!state.success) {
      handledSuccess.current = false
      return
    }

    if (handledSuccess.current || !state.editToken) {
      return
    }

    handledSuccess.current = true

    let tokens: string[] = []

    try {
      const parsed = JSON.parse(localStorage.getItem(COMMENT_TOKEN_KEY) ?? "[]")
      tokens = Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : []
    } catch {
      tokens = []
    }

    const mergedTokens = Array.from(new Set([...tokens, state.editToken]))

    localStorage.setItem(COMMENT_TOKEN_KEY, JSON.stringify(mergedTokens))
    window.dispatchEvent(new Event("anonymous-comment-tokens-changed"))
    formRef.current?.reset()
    router.refresh()
  }, [pending, router, state.editToken, state.success])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm"
    >
      <input type="hidden" name="postId" value={postId} />

      <div className="space-y-2">
        <label htmlFor="comment-body" className="text-sm font-medium">
          Leave a comment
        </label>
        <textarea
          id="comment-body"
          name="body"
          required
          maxLength={300}
          rows={3}
          placeholder="Write a short reply..."
          className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-ring"
        />
      </div>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Comment"}
      </Button>
    </form>
  )
}
