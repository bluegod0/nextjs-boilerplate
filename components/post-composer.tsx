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
    <form
      action={formAction}
      className="space-y-4 rounded-[1.75rem] border border-[#e6d8c7] bg-[#fffaf4] p-5 shadow-[0_12px_30px_rgba(75,48,26,0.06)]"
    >
      <div className="space-y-2">
        <label htmlFor="post-title" className="text-sm font-medium text-[#2d2118]">
          Title
        </label>
        <input
          id="post-title"
          name="title"
          required
          maxLength={80}
          placeholder="Share something small"
          className="w-full rounded-2xl border border-[#dfcfbc] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition placeholder:text-[#aa9682] focus:border-[#cfa882] focus:ring-4 focus:ring-[#d8b18d]/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="post-body" className="text-sm font-medium text-[#2d2118]">
          Body
        </label>
        <textarea
          id="post-body"
          name="body"
          required
          maxLength={1000}
          rows={5}
          placeholder="Write your post here..."
          className="w-full rounded-2xl border border-[#dfcfbc] bg-white px-4 py-3 text-sm text-[#241a13] outline-none transition placeholder:text-[#aa9682] focus:border-[#cfa882] focus:ring-4 focus:ring-[#d8b18d]/20"
        />
      </div>

      {state.error ? <p className="text-sm text-[#a33d2e]">{state.error}</p> : null}

      <Button type="submit" disabled={pending} className="rounded-full px-5">
        {pending ? "Posting..." : "Post"}
      </Button>
    </form>
  )
}
