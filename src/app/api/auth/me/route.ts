// 
import { NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"
import { parse } from "cookie"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!

// Define the JWT payload type
interface MyJwtPayload extends JwtPayload {
  sub: string // or number if you store it as number
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || ""
    const cookies = parse(cookieHeader)
    const token = cookies.token
    if (!token) return NextResponse.json({ user: null })

    // Verify token and cast to custom payload
    const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload

    // Make sure sub exists
    if (!decoded.sub) {
      return NextResponse.json({ user: null })
    }

    const id = Number(decoded.sub)
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
    const user = result[0] ?? null
    if (!user) return NextResponse.json({ user: null })

    // Omit password safely
    // Assuming user is of type { id: number; name: string; email: string; password: string }
    const { password: _p, ...rest } = user
    return NextResponse.json({ user: rest })
  } catch (err) {
    return NextResponse.json({ user: null })
  }
}
