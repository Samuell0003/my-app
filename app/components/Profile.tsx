// 'use client'
import { Session } from "next-auth"
import EditProfile from "./EditProfile"
import ButtonLogout from "./ButtonLogout"

interface Props {
    user?: Session["user"]
}



export default function Profile(props: Props) {
    return (
        <div className="flex flex-col">
            <div className="w-full ">
                <img className="w-full " src={props.user?.avatar}></img>
            </div>
            <div className="p-4">
                <h2 className="text-xl tracking-wide font-semibold">
                    {props.user?.firstName}
                </h2>
                <span className="font-semibold tracking-wide text-xs text-gray-400">{props.user?.email}</span>
            </div>
            <div className="p-4 self-center">
                <EditProfile user={props.user}/>
                <ButtonLogout/>
            </div>
        </div>
    )
}