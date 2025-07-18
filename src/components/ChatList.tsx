"use client"

import Link from 'next/link';
import React from 'react'
import Image from "next/image";
 
const ChatList = ({chats}) => {
  
    return (
    
      <div className="mt-5 flex flex-col gap-7"> 
{chats?.map((chat) => {
  const isGroup = chat.is_group;
  const participant = chat.participants[0]; // only one in private
  const displayName = isGroup
    ? chat.name
    : `${participant?.first_name || "Unknown"}`;

  const lastMsg = chat.last_message?.content || "No messages yet";
 
  return (
    <Link key={chat.id} href={`/chat/${chat.id}`}>
      <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer border">
        <div className="flex items-center space-x-3">
          <Image
            src={participant?.profile_picture || "/default-avatar.png"}
            alt={displayName}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>

            <div className="flex justify-between items-center">
     <h3 className="font-semibold">{displayName}</h3>

                      <div className="text-xs text-gray-400">
          {chat.last_message?.created_at
            ? new Date(chat.last_message.created_at).toLocaleTimeString()
            : ""}
        </div>
            </div>
       

            <p className="text-sm text-gray-500 truncate max-w-[200px] text-wrap">
              {lastMsg}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
})}

  </div>
  )
}

export default ChatList