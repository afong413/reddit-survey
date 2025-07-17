"use client"

import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"
import { motion } from "motion/react"

export function Nav({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const pages = [
    { title: "Admin Dashboard", href: "/admin" },
    { title: "Post Bias Survey", href: "/admin/survey/post-bias" },
    { title: "User Credence Survey", href: "/admin/survey/user-credence" },
  ]

  return (
    <div className={cn("flex justify-between p-4", className)} {...props}>
      <a
        href="/"
        className="text-xl font-bold hover:text-orange-400 dark:hover:text-stone-50/80"
      >
        Fact-Checking Surveys
      </a>
      <div className="flex gap-4">
        {pages.map(({ title, href }, i) => (
          <div key={i} className="flex items-center px-4">
            <a
              href={href}
              className="hover:text-orange-400 dark:hover:text-stone-50/80"
            >
              {title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
