'use client'
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ButtonLogout({
    children,
    className
  }: {
    children: React.ReactNode,
    className?:string
  }) {
    const route = useRouter();
    
    async function logout() {
        await signOut({
            redirect: false
        })
        route.replace("/")
    
    }
    return (
        <Button variant="outline" className={cn("ml-4", className)} onClick={logout}>{children}</Button>
    )
}

