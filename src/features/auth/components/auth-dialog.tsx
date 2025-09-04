"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AuthDialog() {
  const [open, setOpen] = useState(true)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

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
              onClick={() => setMode("login")}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              ← Back
            </button>
          )}
        </DialogHeader>

        {mode === "login" ? (
          <div className="space-y-3">
            <button
              onClick={() => alert('Google login (to be implemented)')}
              className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-2 text-sm font-medium hover:bg-gray-50 shadow-sm"
            >
              {/* Google Icon */}
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.9 0 6.5 1.6 8 2.9l6-6.1C34.2 3.1 29.6 1 24 1 14.7 1 6.9 6.8 3 14.9l7.2 5.6C11.8 15 17.4 9.5 24 9.5z" />
                <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.6H24v8.6h12.7c-.5 2.9-2 5.4-4.3 7.1l6.9 5.4C44.6 37.6 46.5 31.5 46.5 24.5z" />
                <path fill="#4A90E2" d="M10.2 29.1a14.7 14.7 0 010-9.2l-7.2-5.6A23.9 23.9 0 001 24.5c0 3.8.9 7.4 2.6 10.6l6.6-6z" />
                <path fill="#FBBC05" d="M24 46c6.3 0 11.6-2.1 15.4-5.8l-7.3-5.7C29.6 35.9 26.1 37 24 37c-7 0-12.7-5.5-14-11.3l-7.2 5.6C6.9 41.2 14.7 46 24 46z" />
              </svg>
              Continue with Google
            </button>

            <Button onClick={() => setMode("register")} className="w-full rounded-full bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-md">
              Login with Email
            </Button>

            <p className="text-center text-sm text-gray-500">
              New user?{" "}
              <button onClick={() => setMode("register")} className="underline text-blue-600 font-medium">
                Create new account
              </button>
            </p>

            <p className="mt-2 text-center text-xs text-gray-400">
              By continuing, you agree to our <span className="underline">Privacy Policy</span> and <span className="underline">T&Cs</span>
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full rounded-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 shadow-md">
              Create my account
            </Button>

            <p className="mt-3 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="underline text-blue-600">
                Login
              </button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
