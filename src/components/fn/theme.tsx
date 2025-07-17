"use client"

import { useEffect } from "react"

export function Theme() {
  useEffect(() => {
    if (!("theme" in localStorage)) {
      localStorage.theme =
        window.matchMedia("(prefers-color-scheme: dark)").matches ?
          "dark"
        : "light"
    }
    document.documentElement.classList.toggle("dark", localStorage.theme === "dark")
  }, [])

  return null
}
