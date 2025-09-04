import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { serialize } from "cookie"

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "3600"

type Body = { email: string; password: string }

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as Body

    if (!email || !password) {
      return NextResponse.json({ error: "email and password required" }, { status: 400 })
    }

    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
    const user = result[0]

    if (!user) return NextResponse.json({ error: "invalid credentials" }, { status: 401 })

    const valid = await bcrypt.compare(password, user.password ?? "")
    if (!valid) return NextResponse.json({ error: "invalid credentials" }, { status: 401 })

    const token = jwt.sign({ sub: String(user.id), email: user.email }, JWT_SECRET, {
      expiresIn: Number(JWT_EXPIRES_IN),
    })

    const cookie = serialize("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(JWT_EXPIRES_IN),
    })

    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "internal error" }, { status: 500 })
  }
}
