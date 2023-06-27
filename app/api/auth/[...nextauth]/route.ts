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
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            async authorize(credentials) {
                
                const { username, password } = credentials as {
                    username: string,
                    password: string
                }
                if (!username || !password) {
                    throw new Error("Wrong credentials. Try again.")
                }
                const maybeUser = await prisma.user.findFirst({
                    where: {
                        username: username
                    }
                })

                if (maybeUser) {
                    const passwordIsCorrect = await bcrypt.compare(password, maybeUser.passwordHash)
                    if (!passwordIsCorrect) {
                        throw new Error("Wrong credentials. Try again.")
                    } else {
                        const user = {
                            username: maybeUser.username, 
                            id: maybeUser.id
                        }
                        return user
                    }
                } else {
                    throw new Error("Wrong credentials. Try again.")
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }