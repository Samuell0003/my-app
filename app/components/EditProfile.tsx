// 'use server-'
import { Button } from "@/app/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Session } from "next-auth"
import { useState } from "react"
import { getSession } from "next-auth/react"
import axios, { isCancel, AxiosError } from 'axios';

interface Props {
    user?: Session["user"]
}
export default function EditProfile(props: Props) {

    const [firstName, setFirstName] = useState(props.user?.firstName);
    const [lastName, setLastName] = useState(props.user?.lastName);
    const [email, setEmail] = useState(props.user?.email);
    const secret = process.env.NEXTAUTH_SECRET

    const update = async () => {
        const session: any = await getSession();
        // console.log({
        //     id: props.user?.id,
        //     email: email,
        //     firstName: lastName,
        //     lastName: firstName
        // });
        // console.log(session.accessToken);

        const result = await axios({
            method: "put",
            url: "http://localhost:8080/auth/update",
            headers: {
                // Authorization: "Bearer " + session.accessToken,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            data: {
                id: props.user?.id,
                email: email,
                firstName: lastName,
                lastName: firstName
            }
        })

       






    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">
                            Primeiro Nome
                        </Label>
                        <Input
                            id="firstName"
                            // defaultValue={firstName}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="col-span-3"
                            type="text"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">
                            Sobrenome
                        </Label>
                        <Input
                            id="lastName"
                            // defaultValue={props.user?.lastName}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="col-span-3"
                            type="text"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            // defaultValue={props.user?.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-span-3"
                            type="email"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={update}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}

