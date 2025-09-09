// 

import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

type Body = { email: string; password: string; name?: string }

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as Body

    if (!email || !password) {
      return NextResponse.json({ error: "email and password required" }, { status: 400 })
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json({ error: "user already exists" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const inserted = await db
      .insert(users)
      .values({
        email,
        password: hashed,
        provider: "credentials",
      })
      .returning()

    const created = inserted[0]

    // Omit password in a type-safe way
    const { password: _p, ...userWithoutPassword } = created

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "internal error" }, { status: 500 })
  }
}
