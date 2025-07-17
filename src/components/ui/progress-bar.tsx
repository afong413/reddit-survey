import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"

const ProgressBar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    progress: number
  }
>(({ className, progress, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-full border border-stone-950 bg-stone-200 dark:border-stone-50 dark:bg-stone-700",
        className,
      )}
      {...props}
    >
      <div
        className="absolute left-0 h-full rounded-full bg-orange-400 dark:bg-stone-50"
        style={{ width: `${100 * progress}%` }}
      />
      {children}
    </div>
  )
})
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
