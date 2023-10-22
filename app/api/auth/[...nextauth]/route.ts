import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "login", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://127.0.0.1:8080/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user
                }
                return null
            },
        })
    ],
    pages: {
        signIn: "/",
        error: "error",
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)

            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        },
    }

}
const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }