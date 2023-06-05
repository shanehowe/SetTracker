import NextAuth from "next-auth/next"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        email: string
        sub: string
        username: string
        id: number
        iat: number
        exp: number
        jti: string
    }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
        email: string
        sub: string
        username: string
        id: number
        iat: number
        exp: number
        jti: string
  }
}