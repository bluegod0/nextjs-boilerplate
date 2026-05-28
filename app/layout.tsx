import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Anonymous Cafe",
  description: "A minimal anonymous board for posts and comments.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f4efe6] text-[#1f1a17] antialiased`}
      >
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,138,76,0.2),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(90,68,45,0.14),_transparent_28%),linear-gradient(180deg,_#fbf8f2_0%,_#f4efe6_100%)]" />
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#d7a56a]/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-[32rem] h-80 w-80 rounded-full bg-[#8f6a4f]/10 blur-3xl" />
          <div className="relative">{children}</div>
        </div>
      </body>
    </html>
  )
}
