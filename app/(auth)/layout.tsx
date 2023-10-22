import { ReactNode } from "react"
import ItemsNavBar from "../components/ItemsNavBar"
import Navbar from "@/app/components/Navbar"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

interface PrivateLayoutProps{
  children: ReactNode
}
export default async function Layout({
  children, // will be a page or nested layout
}: PrivateLayoutProps
) {
  const session = await getServerSession(nextAuthOptions)


  if (!session)
    redirect('/')
  return (
    <div className="flex flex-row">
      <Navbar/>
      <main>{children}</main>
    </div>
  )
}