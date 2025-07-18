import { Nav } from "@/components/admin-nav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Nav className="sticky top-0 h-16 w-full" />
      <div className="w-full flex-1">{children}</div>
    </div>
  )
}
