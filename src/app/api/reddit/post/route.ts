// app/api/reddit-post/route.ts

import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 },
    )
  }

  // Validate Reddit URL pattern to prevent abuse
  if (
    !/^https:\/\/www\.reddit\.com\/r\/[^/]+\/comments\/[a-z0-9]+\.json$/i.test(
      url,
    )
  ) {
    return NextResponse.json(
      { error: "Invalid Reddit post URL format" },
      { status: 400 },
    )
  }

  try {
    const redditRes = await fetch(url)

    if (!redditRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Reddit" },
        { status: redditRes.status },
      )
    }

    const data = await redditRes.json()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", detail: String(err) },
      { status: 500 },
    )
  }
}
