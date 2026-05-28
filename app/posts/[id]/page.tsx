import Link from "next/link"
import { notFound } from "next/navigation"
import { CommentComposer } from "@/components/comment-composer"
import { CommentThread } from "@/components/comment-thread"
import { getPost } from "@/lib/cafe"

function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-12">
      <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">
        Back to posts
      </Link>

      <article className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Anonymous Cafe
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">{post.body}</p>
        <time className="text-xs text-muted-foreground" dateTime={post.createdAt.toISOString()}>
          Posted {formatDateTime(post.createdAt)}
        </time>
      </article>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <p className="text-sm text-muted-foreground">{post.comments.length} total</p>
        </div>

        <CommentComposer postId={post.id} />
        <CommentThread postId={post.id} comments={post.comments} />
      </section>
    </main>
  )
}
