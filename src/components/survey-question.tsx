"use client"

import { Scale } from "@/components/ui/scale"
import { cn } from "@/lib/utils"
import { LucideEyeOff } from "lucide-react"
import { AnimatePresence } from "motion/react"
import {
  ComponentPropsWithoutRef,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { motion } from "motion/react"

export type Question = {
  title: string
  instructions: string
  duration: number
  scale: {
    left: string
    right: string
    size: number
  }
}

export default function SurveyQuestion({
  children,
  className,
  question,
  answerState,
  onSubmit,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  question: Question
  answerState: [number | null, Dispatch<SetStateAction<number | null>>]
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  const [timeRemaining, setTimeRemaining] = useState(question.duration)

  useEffect(() => {
    if (timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  return (
    <div
      className={cn(
        "flex w-full max-w-3xl flex-col items-center space-y-6 py-6",
        className,
      )}
      {...props}
    >
      <div className="flex w-full justify-between space-x-4">
        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <p className="text-sm font-semibold">{question.instructions}</p>
        </div>
        <div className="pt-2 pr-2">
          <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-stone-300 text-2xl font-bold text-stone-600 shadow select-none dark:bg-stone-600 dark:text-stone-300">
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="relative flex w-2xl justify-center">
        {children}
        <AnimatePresence>
          {timeRemaining <= 0 && (
            <motion.div
              className="absolute top-0 left-0 flex size-full flex-col items-center justify-center rounded-2xl bg-stone-300 dark:bg-stone-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LucideEyeOff className="size-16" />
              <p className="p-6 text-center text-2xl font-bold">
                Time limit reached. Please submit response.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form
        className="flex w-full items-center space-x-12 p-2 pt-0"
        onSubmit={onSubmit}
      >
        <div className="flex grow space-x-6">
          <span>{question.scale.left}</span>
          <Scale
            className="grow"
            size={question.scale.size}
            answerState={answerState}
          />
          <span>{question.scale.right}</span>
        </div>
        <button
          type="submit"
          className="h-10 w-24 cursor-pointer justify-center rounded-lg bg-orange-400 text-center text-stone-950 shadow hover:bg-orange-400/90 disabled:bg-orange-400/70 dark:bg-stone-50 dark:hover:bg-stone-50/90 dark:disabled:bg-stone-500"
          disabled={answerState[0] === null}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
