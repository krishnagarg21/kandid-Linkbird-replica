import { NextResponse } from "next/server"

export async function GET() {
  const redirectUri = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  )
  const scope = encodeURIComponent("openid email profile")
  const clientId = process.env.GOOGLE_CLIENT_ID

  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&prompt=consent`

  return NextResponse.redirect(url)
}
