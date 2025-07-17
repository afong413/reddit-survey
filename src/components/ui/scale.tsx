import { cn } from "@/lib/utils"
import { Dispatch, FormEventHandler, forwardRef, HTMLAttributes, SetStateAction, useState } from "react"

const Scale = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    size: number
    answerState: [number | null, Dispatch<SetStateAction<number | null>>]
  }
>(({ className, size, answerState, ...props }, ref) => {
  // const [selected, setSelected] = useState<number | null>(null)

  function handleSelection(n: number) {
    if (answerState[0] === n) {
      answerState[1](null)
    } else {
      answerState[1](n)
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative flex h-6 justify-between", className)}
      {...props}
    >
      {Array.from({ length: size }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "aspect-square h-full rounded-full border-2 p-0.5 dark:border-stone-50 cursor-pointer",
            i === answerState[0] ? "border-orange-400" : "border-stone-700",
          )}
          onClick={() => handleSelection(i)}
        >
          {i === answerState[0] && (
            <div className="size-full rounded-full bg-orange-400 dark:bg-stone-50" />
          )}
        </div>
      ))}
    </div>
  )
})
Scale.displayName = "Scale"

export { Scale }
