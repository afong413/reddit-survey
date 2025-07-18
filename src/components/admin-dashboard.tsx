"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Dashboard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  async function handleLogout() {
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/login")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Account Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="uid">User ID</Label>
              <pre id="uid">{user?.id ?? " "}</pre>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <pre id="email">{user?.email ?? " "}</pre>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              className="w-full"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log Out"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
