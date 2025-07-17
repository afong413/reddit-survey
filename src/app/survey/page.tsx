import RedditSurvey, { RedditQuestion } from "@/components/reddit-survey"
import { LucideXCircle } from "lucide-react"
import { cookies } from "next/headers"
import _ from "underscore"

import {
  questionSets,
  sampleSize,
  instructions,
  completionCode,
} from "./survey"
import { FactCheckMethod } from "@/components/ui/fact-check"

export default async function Survey() {
  const cookieStorage = await cookies()

  const prolificCookie = cookieStorage.get("prolific")
  const {
    PROLIFIC_PID,
    STUDY_ID,
    SESSION_ID,
  }: { PROLIFIC_PID: string; STUDY_ID: string; SESSION_ID: string } =
    JSON.parse(prolificCookie?.value ?? "{}")

  let postIDs: string[] = []
  for (const questionSet of Object.values(questionSets)) {
    postIDs.push(..._.sample(questionSet.true, sampleSize))
    postIDs.push(..._.sample(questionSet.false, sampleSize))
  }
  postIDs = _.shuffle(postIDs)

  // const questions = postIDs.map(async (postID) => {
  //   const post = fetch("/reddit/post")
  // })

  let questions: RedditQuestion[] = []
  for (const questionSet of Object.values(questionSets)) {
    questions.push(
      ...questionSet.true.map((postID) => ({
        title: "",
        instructions:
          "Please rate how credible you believe the following Reddit post to be.",
        duration: 120,
        scale: {
          left: "Not Credible",
          right: "Credible",
          size: 7,
        },
        post: {
          id: postID,
        },
      })),
    )

    questions.push(
      ...questionSet.false.map((postID) => ({
        title: "",
        instructions:
          "Please rate how credible you believe the following Reddit post to be.",
        duration: 120,
        scale: {
          left: "Not Credible",
          right: "Credible",
          size: 7,
        },
        post: {
          id: postID,
          factCheckMethod: _.sample([
            "community",
            "ai",
            "expert",
            undefined,
          ] as (FactCheckMethod | undefined)[]),
        },
      })),
    )
  }
  questions = _.shuffle(questions)
  questions.map((question, i) => {
    question.title = `Question ${i + 1}`
  })

  return (
    <div className="flex size-full max-h-screen overflow-auto px-24">
      {(
        typeof PROLIFIC_PID === "string" &&
        typeof STUDY_ID === "string" &&
        typeof SESSION_ID === "string"
      ) ?
        <RedditSurvey
          className="py-6"
          survey={{
            instructions,
            questions: questions,
            completionCode,
          }}
          prolificData={{ PROLIFIC_PID, STUDY_ID, SESSION_ID }}
        ></RedditSurvey>
      : <div className="align-center absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-stone-50 dark:bg-stone-950">
          <LucideXCircle className="size-16" />
          <p className="p-6 text-center text-2xl font-bold">
            Only accessible via Prolific.
          </p>
        </div>
      }
    </div>
  )
}
