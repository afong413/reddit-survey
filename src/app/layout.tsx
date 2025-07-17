import { Metadata } from "next"
import "./globals.css"
import ThemeToggle from "@/components/theme-toggle"
import { LucideLaptop } from "lucide-react"

export const metadata: Metadata = {
  title: "Fact-Check Survey",
  description: "Surveys for research into fact-checking on social media.",
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const setTheme = `
    (function() {
      try {
        if (!("theme" in localStorage)) {
          localStorage.theme =
            window.matchMedia("(prefers-color-scheme: dark)").matches ?
              "dark"
            : "light"
        }
        document.documentElement.classList.toggle("dark", localStorage.theme === "dark")
      } catch(e) {}
    })()
  `.trim()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setTheme }}></script>
      </head>
      <body className="h-screen antialiased">
        <div className="align-center absolute top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-stone-50 md:hidden dark:bg-stone-950">
          <LucideLaptop className="size-16" />
          <p className="p-6 text-center text-2xl font-bold">
            Only available on a larger screen size.
          </p>
        </div>
        <div className="size-full max-md:hidden">
          {children}
          <ThemeToggle className="absolute right-4 bottom-4 size-8" />
        </div>
      </body>
    </html>
  )
}
