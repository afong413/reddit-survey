"use client"

import { cn } from "@/lib/utils"
import { LucideMoon, LucideSun } from "lucide-react"
import { ComponentPropsWithoutRef } from "react"

export default function ThemeToggle({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  function toggleTheme() {
    const dark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)

    localStorage.theme = dark ? "light" : "dark"
    document.documentElement.classList.toggle("dark", !dark)
  }

  return (
    <button
      className={cn(
        "flex aspect-square items-center justify-center rounded-full",
        className,
      )}
      onClick={toggleTheme}
      {...props}
    >
      <LucideSun className="size-full dark:hidden" />
      <LucideMoon className="hidden size-full dark:block" />
    </button>
  )
}
