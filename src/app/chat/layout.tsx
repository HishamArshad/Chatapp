
import { DropdownMenue } from "@/components/DropdownMenue";
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button";
   import { Search } from "lucide-react";
import { CustomTooltip } from "@/components/Tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { UserPlus, EllipsisVertical, MessageSquareText, View } from 'lucide-react'; 
import Link from "next/link";
import { myChtatList } from "@/actions/serverActions";
import Image from "next/image";
import AddUserDialogue from "@/components/AddUserDialogue";
import ChatList from "@/components/ChatList";
import ChatListWrapper from "@/components/ChatListWrapper";
import { cookies } from "next/headers";
export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const chats = await myChtatList()
  console.log(chats , " CHAT LIST")
  return (
    
      <>
         {/* <Navbar /> */}
    <div className="w-full h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full rounded-lg border"
      >
                <ResizablePanel defaultSize={5} minSize={3} maxSize={5}>
          <div className="flex flex-col gap-2 items-center justify-center ">
            <div className="cursor-pointer hover:bg-amber-200 p-4 mt-5 rounded-full">
                <MessageSquareText className=" "/>
                 </div>
                 <div className="cursor-pointer hover:bg-amber-200 p-4 rounded-full">
                    <View className=" "/>
          </div>
          </div>
        </ResizablePanel>
         <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={15} maxSize={40}>
          <div className=" p-6 flex flex-col gap-7 ">
            <nav className="flex justify-between items-center ">
              <h1 className="font-bold text-lg"><Link href={"/"}>Quick Chat</Link></h1>
              <div className="flex gap-3 items-center">
                 
                    
                        
                        <AddUserDialogue />
                    
                    <DropdownMenue />
              </div>
            </nav>
        

<div className="relative w-full">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
  <input
    type="text"
    className="bg-[#f8f8f8] w-full rounded-full py-1.5 pl-10 pr-4 placeholder-gray-700"
    placeholder="Search a chat..."
  />


</div>
{/* <ChatList chats={chats}/> */}
<ChatListWrapper token={token}/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          {/* <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Chat Area</span>
          </div> */}
         {children}
        </ResizablePanel>
            <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <div className="flex h-full items-center justify-center p-6 bg-gray-100">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
    
      </ResizablePanelGroup>
    </div>
     
      </>
        
    
  );
}
