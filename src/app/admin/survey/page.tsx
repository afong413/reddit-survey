"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { FactCheckMethod } from "@/components/ui/fact-check"
import { LucideChevronLeft, LucideChevronRight } from "lucide-react"
import { questionSets } from "@/app/survey/survey"
import { useEffect, useState } from "react"
import { RedditPost } from "@/components/reddit/post"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type BarChartData = {
  community: number[]
  ai: number[]
  expert: number[]
  null: number[]
}

export default function Survey() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const factCheckMethodHumanReadable = {
    community: "Community",
    ai: "AI",
    expert: "Expert",
    control: "Control",
  }

  const posts: string[] = []
  for (const questionSet of Object.values(questionSets)) {
    posts.push(...questionSet.false)
  }
  for (const questionSet of Object.values(questionSets)) {
    posts.push(...questionSet.true)
  }

  const [postNum, setPostNum] = useState(0)

  useEffect(() => {
    const id = searchParams.get("post")

    if (id && posts[Number(id)]) {
      setPostNum(Number(id))
      fetchDataFromSupabase(posts[Number(id)])
    } else {
      router.replace("/admin/survey?post=0")
      fetchDataFromSupabase(posts[0])
    }
  }, [searchParams, fetchDataFromSupabase, posts, router])

  const [barChartData, setBarChartData] = useState<BarChartData>({
    community: Array(7).fill(0),
    ai: Array(7).fill(0),
    expert: Array(7).fill(0),
    null: Array(7).fill(0),
  })

  const supabase = createClient()

  async function fetchDataFromSupabase(id: string) {
    const { data, error } = await supabase
      .from("post-responses")
      .select()
      .eq("post_id", id)

    const updated: BarChartData = {
      community: [0, 0, 0, 0, 0, 0, 0],
      ai: [0, 0, 0, 0, 0, 0, 0],
      expert: [0, 0, 0, 0, 0, 0, 0],
      null: [0, 0, 0, 0, 0, 0, 0],
    }

    if (error || !data) {
      setBarChartData(updated)
      return
    }

    for (const post of data) {
      updated[post.fact_check_method as keyof BarChartData][post.rating]++
    }

    setBarChartData(updated)
  }

  useEffect(() => {
    fetchDataFromSupabase(posts[postNum])
  }, [postNum, fetchDataFromSupabase, posts])

  return (
    <div className="flex size-full flex-col space-y-6 px-16 pt-6 pb-12">
      <div className="flex h-12 w-full items-center justify-center space-x-6">
        <LucideChevronLeft
          className="size-8 cursor-pointer select-none"
          onClick={() => {
            router.replace(`/admin/survey?post=${Math.max(postNum - 1, 0)}`)
            setPostNum(Math.max(postNum - 1, 0))
          }}
        />
        <h1 className="w-48 text-center text-3xl font-bold">
          {posts[postNum]}
        </h1>
        <LucideChevronRight
          className="size-8 cursor-pointer select-none"
          onClick={() => {
            router.replace(
              `/admin/survey?post=${Math.min(postNum + 1, posts.length - 1)}`,
            )
            setPostNum(Math.min(postNum + 1, posts.length - 1))
          }}
        />
      </div>
      <div className="flex w-full flex-1 gap-12">
        <div className="spacy-y-12 flex h-full flex-2/5 flex-col space-y-6">
          {(
            ["community", "ai", "expert", null] as (FactCheckMethod | null)[]
          ).map((factCheckMethod, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col justify-between space-y-4"
            >
              <h2 className="text-2xl font-bold">
                {factCheckMethodHumanReadable[factCheckMethod ?? "control"]}
              </h2>
              <BarChart
                key={barChartData[factCheckMethod ?? "null"].toString()}
                className="w-full grow"
                data={Object.fromEntries(
                  barChartData[factCheckMethod ?? "null"].map((v, i) => [i, v]),
                )}
              />
            </div>
          ))}
        </div>
        <div className="flex max-h-[calc(100vh-13rem)] flex-3/5 overflow-auto border-y p-6">
          <RedditPost postData={{ id: posts[postNum] }} className="h-fit" />
        </div>
      </div>
    </div>
  )
}
