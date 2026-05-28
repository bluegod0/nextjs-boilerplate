import Link from "next/link"
import { MessageSquareText, PenLine, Sparkles } from "lucide-react"
import { PostComposer } from "@/components/post-composer"
import { listPosts } from "@/lib/cafe"

function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export default async function Home() {
  const posts = await listPosts()

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-[0_16px_40px_rgba(72,46,25,0.08)] backdrop-blur">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8e6240]">
          Creative Cafe
        </Link>
        <nav className="flex items-center gap-2 text-sm text-[#6d5b4d]">
          <a className="rounded-full px-3 py-1.5 transition hover:bg-[#fbf4ea] hover:text-[#543521]" href="#composer">
            Write
          </a>
          <a className="rounded-full px-3 py-1.5 transition hover:bg-[#fbf4ea] hover:text-[#543521]" href="#posts">
            Feed
          </a>
        </nav>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8e6240]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8e6240]/10 text-[#8e6240]">
              <Sparkles className="size-4" />
            </span>
            Anonymous Cafe
          </div>

          <div className="mt-8 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c8b39a]/70 bg-[#fbf4ea] px-3 py-1 text-xs text-[#6f4b2d]">
              <PenLine className="size-3.5" />
              No login, no friction, just a quiet board.
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[#211812] sm:text-5xl">
              Write a small note, leave a reply, and keep the conversation moving.
            </h1>

            <p className="max-w-xl text-sm leading-7 text-[#6d5b4d] sm:text-base">
              A minimalist cafe-style board for anonymous posts and comments. Everything stays
              light, readable, and easy to scan.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#e6d8c7] bg-[#fcf8f2] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c7058]">Anonymous</p>
              <p className="mt-2 text-sm font-medium text-[#2f241d]">No account needed</p>
            </div>
            <div className="rounded-2xl border border-[#e6d8c7] bg-[#fcf8f2] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c7058]">Fast</p>
              <p className="mt-2 text-sm font-medium text-[#2f241d]">Post in one screen</p>
            </div>
            <div className="rounded-2xl border border-[#e6d8c7] bg-[#fcf8f2] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8c7058]">Light</p>
              <p className="mt-2 text-sm font-medium text-[#2f241d]">Simple editing flow</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6d5b4d]">
            <span className="rounded-full border border-[#dbc4aa] bg-white px-3 py-1.5">
              Posts
            </span>
            <span className="rounded-full border border-[#dbc4aa] bg-white px-3 py-1.5">
              Comments
            </span>
            <span className="rounded-full border border-[#dbc4aa] bg-white px-3 py-1.5">
              Anonymous ownership
            </span>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-[#e5d7c8] bg-[#2d2118] p-6 text-[#f8f1e8] shadow-[0_18px_50px_rgba(46,31,20,0.2)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <MessageSquareText className="size-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#d8b18d]">Start here</p>
                <h2 className="text-lg font-semibold">Leave the first post</h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#d8c8bb]">
              The board is intentionally quiet: one form, one list, and one simple comment thread.
            </p>
          </section>

          <section
            id="composer"
            className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-[#241a13]">New post</h2>
            <p className="mt-1 text-sm text-[#6d5b4d]">
              Share a thought, an update, or a short recommendation.
            </p>
            <div className="mt-5">
              <PostComposer />
            </div>
          </section>
        </aside>
      </div>

      <section
        id="posts"
        className="mt-8 rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(72,46,25,0.08)] backdrop-blur"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e6240]">
              Latest posts
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#241a13]">What people are saying</h2>
          </div>
          <p className="text-sm text-[#6d5b4d]">{posts.length} total posts</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#d8c4af] bg-[#fcf8f2] p-5 text-sm text-[#6d5b4d] md:col-span-2 xl:col-span-3">
              No posts yet. Start the conversation.
            </p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="group rounded-[1.5rem] border border-[#e4d7c8] bg-[#fffaf4] p-5 shadow-[0_12px_30px_rgba(75,48,26,0.06)] transition hover:-translate-y-0.5 hover:border-[#cfa882] hover:shadow-[0_18px_40px_rgba(75,48,26,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-[#231811] transition group-hover:text-[#8e6240]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-6 text-[#6d5b4d]">
                      {post.body}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#f0e1cf] px-3 py-1 text-xs font-medium text-[#74523b]">
                    {post.commentCount}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs text-[#8b7766]">
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    {formatDateTime(post.createdAt)}
                  </time>
                  <span className="rounded-full border border-[#e4d7c8] bg-white px-2.5 py-1">
                    Open thread
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <Link
        href="#composer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#2d2118] px-5 py-3 text-sm font-semibold text-[#f8f1e8] shadow-[0_16px_40px_rgba(45,33,24,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3a2a1f]"
      >
        Write a post
      </Link>
    </main>
  )
}
