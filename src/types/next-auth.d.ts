import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

// This 'declare module' block augments the types in 'next-auth'
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
  }
}
