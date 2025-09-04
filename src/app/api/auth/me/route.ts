import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { parse } from "cookie"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || ""
    const cookies = parse(cookieHeader)
    const token = cookies.token
    if (!token) return NextResponse.json({ user: null })

    const decoded: any = jwt.verify(token, JWT_SECRET)
    const id = Number(decoded.sub)
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    const user = result[0] ?? null
    if (!user) return NextResponse.json({ user: null })
    // omit password
    const { password: _p, ...rest } = user as any
    return NextResponse.json({ user: rest })
  } catch (err) {
    return NextResponse.json({ user: null })
  }
}
