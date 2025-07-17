import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const url = request.nextUrl

  if (url.pathname === "/survey") {
    if (url.searchParams.size > 0) {
      if (
        url.searchParams.has("PROLIFIC_PID") &&
        url.searchParams.has("STUDY_ID") &&
        url.searchParams.has("SESSION_ID")
      ) {
        const PROLIFIC_PID = url.searchParams.get("PROLIFIC_PID")
        const STUDY_ID = url.searchParams.get("STUDY_ID")
        const SESSION_ID = url.searchParams.get("SESSION_ID")

        const prolificCookieValue = JSON.stringify({
          PROLIFIC_PID,
          STUDY_ID,
          SESSION_ID,
        })

        url.search = ""

        console.log(url)

        return NextResponse.redirect(url, {
          headers: {
            "Set-Cookie": `prolific=${prolificCookieValue}; Path=/; Max-Age=3600${process.env.NODE_ENV !== "development" ? "; HttpOnly; Secure" : ""}`,
          },
        })
      }

      url.search = ""

      return NextResponse.redirect(url)
    }
  }

  // https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#xrobotstag
  response.headers.set("X-Robots-Tag", "noindex, nofollow")

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
