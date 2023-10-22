import NextAuth from "next-auth"
enum Direction {
    ADMIN,
    USER,
  }
  
declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            avatar: string
            email: string
            firstName: string
            lastName: string
            role: Direction
        }
    }
}