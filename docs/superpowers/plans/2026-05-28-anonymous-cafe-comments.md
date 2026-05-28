# Anonymous Cafe Comments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal anonymous cafe board with posts, comments, and same-browser comment edit/delete ownership.

**Architecture:** Keep the feature in the App Router with server actions for writes and Prisma for persistence. Use two new models (`Post`, `Comment`) and a client-side edit-token list in `localStorage` so the browser that created a comment can later edit or delete it without login.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Prisma, PostgreSQL, server actions, localStorage, existing Tailwind/shadcn UI.

---

### Task 1: Extend the database schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add the post and comment models**

```prisma
model Post {
  id        String    @id @default(cuid())
  title     String
  body      String
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Comment {
  id        String   @id @default(cuid())
  postId    String
  editToken String   @unique
  body      String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([postId, createdAt])
}
```

- [ ] **Step 2: Confirm the schema still keeps the existing Auth.js tables**

Run: `pnpm prisma validate`
Expected: schema validates with `Post` and `Comment` added alongside the existing auth tables.

---

### Task 2: Add cafe data helpers and server actions

**Files:**
- Create: `lib/cafe.ts`
- Create: `app/actions.ts`

- [ ] **Step 1: Add Prisma helper functions**

```ts
// lib/cafe.ts
import { db } from "@/lib/db"

export const TITLE_MAX_LENGTH = 80
export const POST_BODY_MAX_LENGTH = 1000
export const COMMENT_BODY_MAX_LENGTH = 300
export const COMMENT_TOKEN_KEY = "anonymous-comment-edit-tokens"

export function normalizeText(value: string) {
  return value.trim()
}

export async function listPosts() {
  return db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
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
}

export async function getPost(id: string) {
  return db.post.findUnique({
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
}
```

- [ ] **Step 2: Add server actions with validation and ownership checks**

```ts
// app/actions.ts
"use server"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  COMMENT_BODY_MAX_LENGTH,
  POST_BODY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  normalizeText,
} from "@/lib/cafe"
import { db } from "@/lib/db"

type ActionState = { error?: string; success?: boolean; postId?: string; editToken?: string }

function readValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

export async function createPost(_: ActionState, formData: FormData): Promise<ActionState> {
  const title = normalizeText(readValue(formData, "title"))
  const body = normalizeText(readValue(formData, "body"))

  if (!title) return { error: "Title is required." }
  if (!body) return { error: "Body is required." }
  if (title.length > TITLE_MAX_LENGTH) return { error: "Title is too long." }
  if (body.length > POST_BODY_MAX_LENGTH) return { error: "Body is too long." }

  const post = await db.post.create({ data: { title, body } })
  redirect(`/posts/${post.id}`)
}

export async function createComment(_: ActionState, formData: FormData): Promise<ActionState> {
  const postId = readValue(formData, "postId")
  const body = normalizeText(readValue(formData, "body"))

  if (!postId) return { error: "Post is missing." }
  if (!body) return { error: "Comment is required." }
  if (body.length > COMMENT_BODY_MAX_LENGTH) return { error: "Comment is too long." }

  const editToken = randomUUID()
  await db.comment.create({ data: { postId, body, editToken } })
  revalidatePath(`/posts/${postId}`)
  return { success: true, postId, editToken }
}
```

Then extend the same file with `updateComment` and `deleteComment` using `postId`, `commentId`, and `editToken` hidden fields, verifying `where: { id: commentId, editToken }` before mutating.

- [ ] **Step 3: Verify the action file type-checks**

Run: `pnpm type-check`
Expected: no new type errors in `lib/cafe.ts` or `app/actions.ts`.

---

### Task 3: Build the post and comment UI components

**Files:**
- Create: `components/post-composer.tsx`
- Create: `components/comment-composer.tsx`
- Create: `components/comment-thread.tsx`

- [ ] **Step 1: Create the post composer client component**

```tsx
"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createPost } from "@/app/actions"
import { Button } from "@/components/ui/button"

const initialState = { error: "" }

export function PostComposer() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(createPost, initialState)

  useEffect(() => {
    if (state.success && state.postId) router.push(`/posts/${state.postId}`)
  }, [router, state.postId, state.success])

  return (
    <form action={formAction} className="space-y-3">
      <input name="title" required maxLength={80} className="w-full rounded-md border px-3 py-2" />
      <textarea name="body" required maxLength={1000} rows={5} className="w-full rounded-md border px-3 py-2" />
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Posting..." : "Post"}</Button>
    </form>
  )
}
```

- [ ] **Step 2: Create the comment composer client component**

```tsx
"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createComment } from "@/app/actions"

const TOKEN_KEY = "anonymous-comment-edit-tokens"

export function CommentComposer({ postId }: { postId: string }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(createComment, { error: "" })

  useEffect(() => {
    if (!state.success || !state.editToken || !state.postId) return
    const tokens = JSON.parse(localStorage.getItem(TOKEN_KEY) ?? "[]")
    localStorage.setItem(TOKEN_KEY, JSON.stringify(Array.from(new Set([...tokens, state.editToken]))))
    router.refresh()
  }, [router, state.editToken, state.postId, state.success])

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <textarea name="body" required maxLength={300} rows={3} className="w-full rounded-md border px-3 py-2" />
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Comment"}</Button>
    </form>
  )
}
```

- [ ] **Step 3: Create the comment thread client component**

```tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { deleteComment, updateComment } from "@/app/actions"

type Comment = {
  id: string
  editToken: string
  body: string
  createdAt: string | Date
  updatedAt: string | Date
}

const TOKEN_KEY = "anonymous-comment-edit-tokens"

export function CommentThread({ postId, comments }: { postId: string; comments: Comment[] }) {
  const [ownedTokens, setOwnedTokens] = useState<string[]>([])

  useEffect(() => {
    setOwnedTokens(JSON.parse(localStorage.getItem(TOKEN_KEY) ?? "[]"))
  }, [])

  const ownedComments = useMemo(
    () => new Set(comments.filter((comment) => ownedTokens.includes(comment.editToken)).map((comment) => comment.id)),
    [comments, ownedTokens]
  )

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-lg border p-4">
          <p>{comment.body}</p>
          {ownedComments.has(comment.id) ? (
            <div className="mt-3 flex gap-2">
              {/* edit/delete controls call updateComment/deleteComment with hidden commentId/editToken/postId fields */}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Verify the UI components compile**

Run: `pnpm type-check`
Expected: the new client components compile cleanly.

---

### Task 4: Replace the home page and add the post detail route

**Files:**
- Modify: `app/page.tsx`
- Create: `app/posts/[id]/page.tsx`

- [ ] **Step 1: Update the home page to list posts and show the composer**

```tsx
// app/page.tsx
import { listPosts } from "@/lib/cafe"
import { PostComposer } from "@/components/post-composer"

export default async function Home() {
  const posts = await listPosts()

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Anonymous Cafe</h1>
        <p className="text-sm text-muted-foreground">Write a post without signing in.</p>
        <PostComposer />
      </section>

      <section className="space-y-4">
        {posts.map((post) => (
          <a key={post.id} href={`/posts/${post.id}`} className="block rounded-lg border p-4 hover:bg-muted/40">
            <h2 className="font-medium">{post.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
          </a>
        ))}
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Add the post detail page**

```tsx
// app/posts/[id]/page.tsx
import { notFound } from "next/navigation"
import { getPost } from "@/lib/cafe"
import { CommentComposer } from "@/components/comment-composer"
import { CommentThread } from "@/components/comment-thread"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
      <article className="space-y-4">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="whitespace-pre-wrap">{post.body}</p>
      </article>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentComposer postId={post.id} />
        <CommentThread postId={post.id} comments={post.comments} />
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Run a production build**

Run: `pnpm build`
Expected: the app builds and the new routes render without module resolution errors.

---

### Task 5: Verify the anonymous ownership flow

**Files:**
- No new files

- [ ] **Step 1: Smoke test the full flow**

Run: `pnpm dev`
Expected:
1. Create a post on `/`
2. Open `/posts/[id]`
3. Create a comment
4. Refresh the page and confirm the comment shows edit/delete controls in the same browser
5. Edit the comment and confirm the body updates
6. Delete the comment and confirm it disappears

- [ ] **Step 2: Commit the implementation**

```bash
git add prisma/schema.prisma lib/cafe.ts app/actions.ts components/post-composer.tsx components/comment-composer.tsx components/comment-thread.tsx app/page.tsx app/posts/[id]/page.tsx
git commit -m "feat: add anonymous cafe posts and comments"
```

