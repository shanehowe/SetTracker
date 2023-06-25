import prisma from "@/lib/prisma"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"


const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = parseInt(user.id)
                // @ts-ignore
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (session) {
                session.user = token
            }
            return session
        }
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials) {
                
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }
                if (!email || !password) {
                    throw new Error("Wrong credentials. Try again.")
                }
                const maybeUser = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                })
                
                if (maybeUser) {
                    const passwordIsCorrect = await bcrypt.compare(password, maybeUser.passwordHash)
                    if (!passwordIsCorrect) {
                        throw new Error("Wrong credentials. Try again.")
                    } else {
                        const user = {
                            email: maybeUser.email, 
                            username: maybeUser.username, 
                            id: maybeUser.id
                        }
                        return user
                    }
                } else {
                    return null
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }