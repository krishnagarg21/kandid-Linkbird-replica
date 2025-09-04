import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")

    if (!code) return NextResponse.json({ error: "no code" }, { status: 400 })

    // exchange code for tokens
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    })
    const tokenJson = await tokenResp.json()
    const accessToken = tokenJson.access_token

    // fetch profile info
    const userinfoResp = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const profile = await userinfoResp.json()

    // upsert user
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, profile.email))
      .limit(1)

    let user
    if (existing.length > 0) {
      user = existing[0]
    } else {
      const inserted = await db
        .insert(users)
        .values({
          email: profile.email,
          provider: "google",
        })
        .returning()
      user = inserted[0]
    }

    // create jwt
    const token = jwt.sign(
      { sub: String(user.id), email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: Number(process.env.JWT_EXPIRES_IN ?? 3600) }
    )

    // set cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return new NextResponse(null, {
      status: 302,
      headers: {
        "Set-Cookie": cookie,
        Location: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "auth failed" }, { status: 500 })
  }
}
