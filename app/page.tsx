import Link from "next/link"
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
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-12">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Anonymous Cafe
        </p>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Write a post, leave a reply.</h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            A tiny public board where anyone can post and comment without logging in.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">New post</h2>
        <PostComposer />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Latest posts</h2>
          <p className="text-sm text-muted-foreground">{posts.length} total</p>
        </div>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
            No posts yet. Start the conversation.
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block rounded-2xl border bg-card p-4 shadow-sm transition hover:border-ring hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">{post.title}</h3>
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {post.body}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                    {post.commentCount}
                  </span>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {formatDateTime(post.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
