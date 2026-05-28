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
      className="space-y-4 rounded-[1.75rem] border border-[#e6d8c7] bg-[#fffaf4] p-5 shadow-[0_12px_30px_rgba(75,48,26,0.06)]"
    >
      <input type="hidden" name="postId" value={postId} />

      <div className="space-y-2">
        <label htmlFor="comment-body" className="text-sm font-medium text-[#2d2118]">
          Leave a comment
        </label>
        <textarea
          id="comment-body"
          name="body"
          required
          maxLength={300}
          rows={3}
          placeholder="Write a short reply..."
          className="w-full rounded-2xl border border-[#dfcfbc] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition placeholder:text-[#aa9682] focus:border-[#cfa882] focus:ring-4 focus:ring-[#d8b18d]/20"
        />
      </div>

      {state.error ? <p className="text-sm text-[#a33d2e]">{state.error}</p> : null}

      <Button type="submit" disabled={pending} className="rounded-full px-5">
        {pending ? "Saving..." : "Comment"}
      </Button>
    </form>
  )
}
