'use client'
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";

type Props = {
    children?: React.ReactNode;
}
export default function NextAuthSessionProvider({ children }: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}