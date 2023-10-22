'use client'
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
    const route = useRouter();
    
    async function logout() {
        await signOut({
            redirect: false
        })
        route.replace("/")
    
    }
    return (
        <Button variant="outline" className="ml-4" onClick={logout}>Sair</Button>
    )
}

