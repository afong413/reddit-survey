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
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Admin() {
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  // const [error, setError] = useState<string | null>(null)
  // const [isLoading, setIsLoading] = useState(false)
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
    // setIsLoading(true)
    // setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/login")
    } catch {
      // setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <div className="flex size-full shrink-0 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex w-full flex-col gap-6">
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
                <Button className="w-full" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
