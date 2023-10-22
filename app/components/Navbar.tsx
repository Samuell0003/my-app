'use client'
import ItemsNavBar from "@/app/components/ItemsNavBar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import SlideOver from "./SlideOver";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
    const { data: session, status } = useSession();

    const [isProfile, setProfile] = useState<boolean>(false);

    function closeProfile() {
        setProfile(false);
    }

    return (
        <header className="h-screen">
            <div className="flex flex-col items-center w-60 h-full  overflow-hidden text-white bg-violet-500 ">
                <a className="flex items-center w-full px-3 mt-3" href="#">
                    <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <span className="ml-2 text-sm font-bold">Master Control</span>
                </a>
                <div className="w-full px-2">
                    <div className="flex flex-col items-center w-full mt-3 border-t border-white">
                        <ItemsNavBar></ItemsNavBar>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-16 mt-auto bg-violet-700 hover:bg-violet-900 cursor-pointer" onClick={() => setProfile(!isProfile)}>
                    {!session?.user ?
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-9 w-9 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-[100px]" />
                            </div>
                        </div>
                        :
                        <>

                            <Avatar>
                                <AvatarImage src={session?.user.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="ml-2 text-sm font-medium">{session?.user.firstName}</span>
                            <SlideOver open={isProfile} closeProfile={closeProfile} user={session?.user} />
                        </>
                    }
                </div>
            </div>
        </header>
    )
}