import { cn } from "@/lib/utils"
import { forwardRef, Fragment, HTMLAttributes } from "react"
import _ from "underscore"

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: {
    [K: string]: number
  }
}

const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  ({ className, data, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)} {...props} ref={ref}>
        <div className="flex flex-1 items-end border-b">
          <div className="flex-1" />
          {Object.values(data).map((n, i) => (
            <Fragment key={i}>
              <div
                className="max-w-20 flex-1 bg-orange-400 dark:bg-stone-50 border border-b-0"
                style={{ height: `${(100 * n) / _.max(data)}%` }}
              />
              <div className="flex-1" />
            </Fragment>
          ))}
        </div>
        <div className="flex items-end">
          <div className="flex-1" />
          {Object.keys(data).map((key, i) => (
            <Fragment key={i}>
              <span className="max-w-20 flex-1 text-center">{key}</span>
              <div className="flex-1" />
            </Fragment>
          ))}
        </div>
      </div>
    )
  },
)
BarChart.displayName = "BarChart"

export { BarChart }
