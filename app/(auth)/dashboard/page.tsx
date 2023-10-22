import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import SlideOver from "@/app/components/SlideOver";
import { getServerSession } from "next-auth";

export default async function Page() {
  // const { data: session, status } = useSession();
  const session = await getServerSession(nextAuthOptions)
  // console.log(session?.user?.email);
  
    return (
      <>
        <h1 className="p-0">Hello, {session?.user.firstName}!</h1>
      </>
    )
  }