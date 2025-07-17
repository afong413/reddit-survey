import { NextRequest, NextResponse } from "next/server"
import { FactCheckMethod } from "@/components/ui/fact-check"

export type Post = {
  subreddit: string
  title: string
  author: {
    username: string
    pfp?: string
  }
  image?: string
  text?: string
  context?: {
    [C in FactCheckMethod]: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const base = request.nextUrl.origin

  const jsonRes = await fetch(`${base}/reddit/json/${id}.json`)
  if (!jsonRes.ok) {
    return NextResponse.json({ error: "No such post" }, { status: 404 })
  }
  const post: Post = await jsonRes.json()

  const imgRes = await fetch(`${base}/reddit/img/${id}.png`)
  if (imgRes.ok) {
    const imgBuffer = await imgRes.arrayBuffer()
    post.image = `data:image/png;base64,${Buffer.from(imgBuffer).toString("base64")}`
  }

  const pfpRes = await fetch(`${base}/reddit/pfp/${id}.png`)
  let pfpBuffer: ArrayBuffer
  if (pfpRes.ok) {
    pfpBuffer = await pfpRes.arrayBuffer()
  } else {
    pfpBuffer = await fetch(`${base}/reddit/pfp/default.png`).then((res) =>
      res.arrayBuffer(),
    )
  }
  post.author.pfp = `data:image/png;base64,${Buffer.from(pfpBuffer).toString("base64")}`

  return NextResponse.json(post, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
