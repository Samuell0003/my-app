import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Session, User } from "next-auth"
import { SyntheticEvent, useState } from "react"
import { getSession, useSession } from "next-auth/react"
import axios, { isCancel, AxiosError } from 'axios';
import Loading from "./Loading"
import { toast } from "react-toastify"

interface Props {
    user?: Session["user"]
}
export default function EditProfile(props: Props) {
    const { data: session, status, update } = useSession();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isFinish, setFinish] = useState<boolean>(false);

    const [firstName, setFirstName] = useState(props.user?.firstName);
    const [lastName, setLastName] = useState(props.user?.lastName);
    const [email, setEmail] = useState(props.user?.email);

    const updateProf = async (e: SyntheticEvent) => {
        
        const sessionToken: any = await getSession();
        if (validateInputs()) {
            setLoading(true);
            e.preventDefault();
            await axios({
                method: "PUT",
                url: "http://localhost:8765/newsletter-client/auth/update",
                headers: {
                    Authorization: "Bearer " + sessionToken.accessToken,
                    'Content-Type': 'application/json'
                },
                data: {
                    id: props.user?.id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                },
            })
                .then(response => {
                    update({
                        ...session,
                        user: {
                            ...response.data
                        }
                    })
                    setFinish(false);
                    toast.success('Informações atualizadas com sucesso!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch(() => {
                    toast.error('Tente mais tarde', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setFinish(false);

                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }


    function validateInputs(): boolean {
        if (!email || !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
            if (!email) {
                toast.error('Preencha o(s) campo(s) e-mail!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Preencha o(s) campo(s) e-mail corretamente!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            return false;
        } else if (!firstName) {
            toast.error('Preencha o(s) campo(s) primeiro nome corretamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        } else if (!lastName) {
            toast.error('Preencha o(s) campo(s) sobrenome corretamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        return true;
    }


    return (
        <Dialog open={isFinish} onOpenChange={() => setFinish(!isFinish)}>
            <DialogTrigger asChild onClick={() => setFinish(true)}>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    {/* <DialogClose asChild onClick={() => setFinish(false)}></DialogClose> */}
                </DialogHeader>
                <form action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstName" className="text-right">
                                Primeiro Nome
                            </Label>
                            <Input
                                id="firstName"
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                                type="email"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" disabled={isLoading} onClick={updateProf} className="w-20">
                            {!isLoading ? "Salvar" : <Loading></Loading>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}

