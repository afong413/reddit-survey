import { NextRequest, NextResponse } from "next/server"
import { existsSync, readFileSync } from "fs"
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

  if (existsSync(`src/app/reddit/post/json/${id}.json`)) {
    const post = JSON.parse(
      readFileSync(`src/app/reddit/post/json/${id}.json`, "utf-8"),
    ) as Post

    console.log(post)

    if (existsSync(`src/app/reddit/post/img/${id}.png`)) {
      post.image = `data:image/png;base64,${readFileSync(`src/app/reddit/post/img/${id}.png`).toString("base64")}`
    }

    if (existsSync(`src/app/reddit/post/pfp/${id}.png`)) {
      post.author.pfp = `data:image/png;base64,${readFileSync(`src/app/reddit/post/pfp/${id}.png`).toString("base64")}`
    } else {
      post.author.pfp = `data:image/png;base64,${readFileSync(`src/app/reddit/post/pfp/default.png`).toString("base64")}`
    }

    return NextResponse.json(post, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } else {
    return NextResponse.json({ error: "No such post" }, { status: 404 })
  }
}
