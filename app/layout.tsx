import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from '../providers/SessionProvider'
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Master - Control',
  description: 'sdfd',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
