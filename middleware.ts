import { NextResponse, type NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { parse } from "cookie"

// Adjust import path relative to project root
import { db } from "./src/db"
import { users } from "./src/db/schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // List of routes to protect
  const protectedPaths = ["/leads", "/campaigns", "/dashboard", "/settings", "/app"]

  const pathname = url.pathname
  const needsAuth = protectedPaths.some((p) => pathname.startsWith(p))

  if (!needsAuth) return NextResponse.next() // Allow public access

  const cookieHeader = req.headers.get("cookie") || ""
  const cookies = parse(cookieHeader || "")
  const token = cookies.token

  if (!token) {
    // Redirect to login if no token
    url.pathname = "/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  try {
    jwt.verify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (err) {
    // Redirect if token invalid or expired
    url.pathname = "/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/leads/:path*", "/campaigns/:path*", "/dashboard/:path*", "/settings/:path*"],
}
