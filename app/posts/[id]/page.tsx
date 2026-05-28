import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MessageSquareQuote, PenLine } from "lucide-react"
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
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-[0_16px_40px_rgba(72,46,25,0.08)] backdrop-blur">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8e6240]">
          Creative Cafe
        </Link>
        <nav className="flex items-center gap-2 text-sm text-[#6d5b4d]">
          <Link className="rounded-full px-3 py-1.5 transition hover:bg-[#fbf4ea] hover:text-[#543521]" href="/">
            Feed
          </Link>
          <a className="rounded-full px-3 py-1.5 transition hover:bg-[#fbf4ea] hover:text-[#543521]" href="#comments">
            Comments
          </a>
        </nav>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2d1be] bg-[#fbf4ea] px-3 py-1.5 text-sm text-[#6f4b2d] transition hover:border-[#cfa882] hover:text-[#543521]"
          >
            <ArrowLeft className="size-4" />
            Back to posts
          </Link>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f1e0cf] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#8e6240]">
            <PenLine className="size-3.5" />
            Anonymous Cafe
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#211812] sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 rounded-[1.5rem] border border-[#eadbca] bg-[#fffaf4] p-5">
            <p className="whitespace-pre-wrap text-sm leading-8 text-[#2d2118] sm:text-base">
              {post.body}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#725b49]">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              Posted {formatDateTime(post.createdAt)}
            </time>
            <span className="h-1 w-1 rounded-full bg-[#c9a17a]" />
            <span>{post.comments.length} comments</span>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-[#2d2118] bg-[#2d2118] p-6 text-[#f8f1e8] shadow-[0_18px_50px_rgba(46,31,20,0.22)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <MessageSquareQuote className="size-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#d8b18d]">Comment thread</p>
                <h2 className="text-lg font-semibold">Join the discussion</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#dbc8bb]">
              Comments stay anonymous, but your browser remembers which ones you own.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur">
            <h2 className="text-lg font-semibold text-[#241a13]">Leave a comment</h2>
            <p className="mt-1 text-sm text-[#6d5b4d]">
              Keep it short and friendly. You can later edit or delete this comment from the same
              browser.
            </p>
            <div className="mt-5">
              <CommentComposer postId={post.id} />
            </div>
          </section>
        </aside>
      </div>

      <section
        id="comments"
        className="mt-8 rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e6240]">
              Conversation
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#241a13]">
              Recent replies
            </h2>
          </div>
          <p className="text-sm text-[#6d5b4d]">{post.comments.length} comments</p>
        </div>

        <div className="mt-6">
          <CommentThread postId={post.id} comments={post.comments} />
        </div>
      </section>
    </main>
  )
}
