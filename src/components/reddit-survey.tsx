"use client"

import { RedditPost, RedditPostData } from "@/components/reddit/post"
import SurveyQuestion, { Question } from "@/components/survey-question"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { LucideCheckCircle2 } from "lucide-react"
import { ComponentPropsWithoutRef, useState } from "react"

export type RedditQuestion = Question & { post: RedditPostData }

export default function RedditSurvey({
  className,
  survey,
  prolificData,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  survey: {
    instructions: string
    questions: RedditQuestion[]
    completionCode: string
  }
  prolificData: {
    PROLIFIC_PID: string
    STUDY_ID: string
    SESSION_ID: string
  }
}) {
  const [questionNum, setQuestionNum] = useState(-1)
  const [answer, setAnswer] = useState<number | null>(null)

  const supabase = createClient()

  async function handleQuestionSubmition() {
    await supabase.from("post-responses").insert({
      prolific_pid: prolificData.PROLIFIC_PID,
      study_id: prolificData.STUDY_ID,
      session_id: prolificData.SESSION_ID,
      post_id: survey.questions[questionNum].post.id,
      fact_check_method:
        survey.questions[questionNum].post.factCheckMethod ?? null,
      rating: answer,
    })

    if (questionNum >= survey.questions.length - 1) {
      window.open(
        atob(
          "aHR0cHM6Ly9hcHAucHJvbGlmaWMuY29tL3N1Ym1pc3Npb25zL2NvbXBsZXRlP2NjPQ==",
        ) + atob(survey.completionCode),
        "_blank",
        "noopener,noreferrer",
      )
    }

    setQuestionNum(questionNum + 1)
    setAnswer(null)
  }

  return (
    <div
      className={cn(
        "flex h-fit min-h-full w-full flex-col items-center",
        className,
      )}
      {...props}
    >
      {questionNum < 0 ?
        <div className="absolute top-0 flex h-screen min-h-svh w-screen items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Instructions</CardTitle>
                <CardDescription>{survey.instructions}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => setQuestionNum(0)}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      : questionNum < survey.questions.length ?
        <SurveyQuestion
          key={questionNum}
          question={survey.questions[questionNum]}
          answerState={[answer, setAnswer]}
          onSubmit={(e) => {
            e.preventDefault()
            handleQuestionSubmition()
          }}
        >
          <RedditPost postData={survey.questions[questionNum].post} />
        </SurveyQuestion>
      : <div className="align-center absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-stone-50 dark:bg-stone-950">
          <LucideCheckCircle2 className="size-16" />
          <div className="flex flex-col p-6">
            <p className="text-center text-2xl font-bold">Survey complete.</p>
            <p className="text-center text-2xl font-bold">
              Completion Code: {atob(survey.completionCode)}
            </p>
          </div>
        </div>
      }
    </div>
  )
}
