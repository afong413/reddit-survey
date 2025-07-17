"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

export function Nav({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const pages = [
    { title: "Admin Dashboard", href: "/admin" },
    { title: "Post Bias Survey", href: "/admin/survey/post-bias" },
    { title: "User Credence Survey", href: "/admin/survey/user-credence" },
  ]

  return (
    <div className={cn("flex justify-between p-4", className)} {...props}>
      <Link
        href="/"
        className="text-xl font-bold hover:text-orange-400 dark:hover:text-stone-50/80"
      >
        Fact-Checking Surveys
      </Link>
      <div className="flex gap-4">
        {pages.map(({ title, href }, i) => (
          <div key={i} className="flex items-center px-4">
            <Link
              href={href}
              className="hover:text-orange-400 dark:hover:text-stone-50/80"
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
