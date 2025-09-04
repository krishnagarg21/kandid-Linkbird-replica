"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Function to log out
  async function handleLogout() {
    setLoading(true)
    const res = await fetch("/api/auth/logout", { method: "POST" })
    setLoading(false)
    if (res.ok) {
      router.push("/") // Redirect to home (or your login page if different)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Welcome to Your Dashboard!</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
        disabled={loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>

      <button
        onClick={() => router.push("/")}
        className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
      >
        Back to Home
      </button>
    </main>
  )
}
