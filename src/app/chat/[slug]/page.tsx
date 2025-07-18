import { getLoggedInUser } from "@/actions/serverActions"
import Debug from "@/components/Debug"
import RealChat from "@/components/RealChat"
import { cookies } from "next/headers"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const user = await getLoggedInUser()
 console.log(user)
  return <div className="h-screen">
  
   <RealChat token={token} chatId={slug}  currentUserId={user.id}/>   
  </div>
}