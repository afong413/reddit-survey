import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const cookieStorage = await cookies()

  const { PROLIFIC_PID, STUDY_ID, SESSION_ID } = await request.json()

  cookieStorage.set(
    "prolific",
    JSON.stringify({ PROLIFIC_PID, STUDY_ID, SESSION_ID }),
    {
      maxAge: 300,
      httpOnly: false,
      path: "/",
    },
  )
}
