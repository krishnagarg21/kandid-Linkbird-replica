import jwt from "jsonwebtoken"
import { parse } from "cookie"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!

export async function getCurrentUser(req: Request | { headers: Record<string, string> }) {
  // Extract cookie header from Request or object with headers
  const cookieHeader = (req as any).headers?.cookie || ""
  const cookies = parse(cookieHeader || "")
  const token = cookies.token
  if (!token) return null

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const id = decoded.sub
    const result = await db.select().from(users).where(eq(users.id, Number(id))).limit(1)
    return result[0] ?? null
  } catch (err) {
    return null
  }
}
