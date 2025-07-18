"use client"

import { Dashboard } from "@/components/admin-dashboard"

export default function Admin() {
  return (
    <div className="flex size-full shrink-0 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Dashboard />
      </div>
    </div>
  )
}
