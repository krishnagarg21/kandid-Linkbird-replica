"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type AuthVars = { email: string; password: string; name?: string }

export function AuthDialog() {
  const [open, setOpen] = useState(true)
  const [mode, setMode] = useState<"login" | "register" | "email-login">("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState<string | null>(null)

  const loginMutation = useMutation({
    mutationFn: async (vars?: AuthVars) => {
      const body = JSON.stringify(vars ?? { email, password })
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || "login failed")
      return json
    },
    onSuccess: () => {
      setError(null)
      window.location.href = "/dashboard"
    },
    onError: (err: any) => setError(err?.message || "invalid credentials"),
  })

  const registerMutation = useMutation({
    mutationFn: async (vars?: AuthVars) => {
      const payload = JSON.stringify(vars ?? { email, password, name: `${firstName} ${lastName}` })
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || "register failed")
      return json
    },
    onSuccess: async (_data, vars) => {
      setError(null)
      try {
        await loginMutation.mutateAsync({ email: vars?.email ?? email, password: vars?.password ?? password })
      } catch {
        setError("registered but auto login failed, try signing in")
      }
    },
    onError: (err: any) => setError(err?.message || "could not register"),
  })

  const submitting = loginMutation.isPending || registerMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm w-full rounded-2xl bg-white p-8 shadow-2xl space-y-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Continue with an account</DialogTitle>
          {mode === "login" && (
            <p className="text-sm text-gray-500 text-center mt-1">You must log in or register to continue.</p>
          )}
          {mode === "register" && (
            <button
              aria-label="back"
              onClick={() => {
                setMode("login")
                setError(null)
              }}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              ← Back
            </button>
          )}
        </DialogHeader>

        {
  mode === "login" ? (
    <div className="space-y-3">
      {/* Google login button */}
      <button
        onClick={() => (window.location.href = "/api/auth/google")}
        className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-2 text-sm font-medium hover:bg-gray-50 shadow-sm"
      >
        {/* SVG icon */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          {/* ...paths... */}
        </svg>
        Continue with Google
      </button>

      {/* Email login button */}
      <Button
        onClick={() => {
          setMode("email-login")
          setError(null)
        }}
        className="w-full rounded-full bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-md"
      >
        Login with Email
      </Button>

      <p className="text-center text-sm text-gray-500">
        New user?{" "}
        <button
          onClick={() => {
            setMode("register")
            setError(null)
          }}
          className="underline text-blue-600 font-medium"
        >
          Create new account
        </button>
      </p>

      <p className="mt-2 text-center text-xs text-gray-400">
        By continuing, you agree to our <span className="underline">Privacy Policy</span> and <span className="underline">T&Cs</span>
      </p>
    </div>
  ) : mode === "email-login" ? (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setError(null)
        loginMutation.mutate({ email, password })
      }}
      className="space-y-3"
    >
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="login-pass">Password</Label>
        <Input
          id="login-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        className="w-full rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md"
        disabled={submitting}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  ) : (
    <>
      {/* Registration form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setError(null)
          registerMutation.mutate({ email, password, name: `${firstName} ${lastName}` })
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="first">First Name</Label>
            <Input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          </div>
          <div>
            <Label htmlFor="last">Last Name</Label>
            <Input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          </div>
        </div>
        <div>
          <Label htmlFor="reg-email">Email</Label>
          <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div>
          <Label htmlFor="reg-pass">Password</Label>
          <Input id="reg-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md" disabled={submitting}>
          {registerMutation.isPending ? "Creating account..." : "Create my account"}
        </Button>
      </form>

      <p className="mt-3 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button onClick={() => { setMode("login"); setError(null) }} className="underline text-blue-600">
          Login
        </button>
      </p>
    </>
  )
}

      </DialogContent>
    </Dialog>
  )
}
