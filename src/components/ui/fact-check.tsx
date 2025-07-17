"use client"

import { cn } from "@/lib/utils"
import { LucideAlertTriangle, LucideChevronDown, LucideX } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { ComponentProps, forwardRef, useEffect, useState } from "react"
import { motion } from "motion/react"

export type FactCheckMethod = "community" | "ai" | "expert"
export type FactCheckPos =
  | "top"
  | "above title"
  | "below title"
  | "above text"
  | "below text"

const names = {
  community: "Other users",
  ai: "Automated systems",
  expert: "Experts",
}

const FactCheck = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    type: FactCheckMethod
    context?: string
  }
>(({ className, type, context, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col space-y-1 rounded-lg border bg-red-300 p-2 dark:bg-red-800",
        !isOpen && context ? "cursor-pointer" : "",
        className,
      )}
      onClick={() => setIsOpen(true)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 font-bold">
          <LucideAlertTriangle className="size-6" />
          <span>
            {names[type]} have flagged this post as potentially misleading
          </span>
        </div>
        <button
          className="relative flex size-6 cursor-pointer"
          onClick={(e) => {
            setIsOpen(!isOpen)
            e.stopPropagation()
          }}
        >
          {context && (
            <AnimatePresence>
              {isOpen ?
                <motion.div
                  key="chevron"
                  className="absolute top-0 right-0 flex size-full items-center justify-center"
                  initial={{ opacity: 0, rotate: hasMounted ? 90 : 0 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <LucideX />
                </motion.div>
              : <motion.div
                  key="x"
                  className="absolute top-0 right-0 flex size-full items-center justify-center"
                  initial={{ opacity: 0, rotate: hasMounted ? 90 : 0 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <LucideChevronDown />
                </motion.div>
              }
            </AnimatePresence>
          )}
        </button>
      </div>
      {context && <p className={isOpen ? "" : "line-clamp-1"}>{context}</p>}
    </div>
  )
})
FactCheck.displayName = "FactCheck"

export { FactCheck }
