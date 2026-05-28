"use client"

import { useEffect, useRef } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { createPost, type ActionState } from "@/app/actions"
import { Button } from "@/components/ui/button"

const initialState: ActionState = {}

export function PostComposer() {
  const router = useRouter()
  const handledSuccess = useRef(false)
  const [state, formAction, pending] = useActionState(createPost, initialState)

  useEffect(() => {
    if (pending) {
      handledSuccess.current = false
      return
    }

    if (!state.success) {
      handledSuccess.current = false
      return
    }

    if (handledSuccess.current || !state.postId) {
      return
    }

    handledSuccess.current = true
    router.push(`/posts/${state.postId}`)
  }, [pending, router, state.postId, state.success])

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <label htmlFor="post-title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="post-title"
          name="title"
          required
          maxLength={80}
          placeholder="Share something small"
          className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-ring"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="post-body" className="text-sm font-medium">
          Body
        </label>
        <textarea
          id="post-body"
          name="body"
          required
          maxLength={1000}
          rows={5}
          placeholder="Write your post here..."
          className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-ring"
        />
      </div>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Posting..." : "Post"}
      </Button>
    </form>
  )
}
