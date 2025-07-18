"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image";
 
import { lastMessages } from "@/state/globalState";
const RealChat = ({ chatId, token, currentUserId }) => {
  //   console.log(chatId , "id")
  // console.log(token)
  // console.log(currentUserId, "user")
  const [messages, setMessages] = useState([])
  // console.log(messages)
  const [input, setInput] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const ws = useRef(null)
  const bottomRef = useRef(null)
const [typingUsers, setTypingUsers] = useState([])
let typingTimeout = useRef(null)
  // Auto-scroll to bottom
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

useEffect(() => {
  if (!chatId || !token) return;

  fetchHistory().then(() => {
    const socket = new WebSocket(`ws://quickchat.fly.dev/ws/realchat/${chatId}/?token=${token.value}`);
    ws.current = socket;

    socket.onopen = () => {
      setSocketConnected(true);
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data, "DATA")
     
      if (data.typing !== undefined) {
        if (data.user_id !== currentUserId) {
          setTypingUsers((prev) => {
            if (data.typing) return [...new Set([...prev, data.email])]
            return prev.filter((u) => u !== data.email)
          });
           
        }
        return;
      }

      // Prevent duplicate messages by checking ID or timestamp
      setMessages((prev) => {
            //  lastMessages.set(data)
        if (prev.some((msg) => msg.id === data.id)) return prev;
        return [...prev, data];
      });
    };
 


    socket.onclose = () => {
      setSocketConnected(false);
      console.log("❌ WebSocket closed");
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
    };
  });

  return () => {
    ws.current?.close();
    setSocketConnected(false);
  };
}, [chatId, token.value]);


  const sendMessage = () => {
    if (input.trim() === "" || !ws.current || ws.current.readyState !== WebSocket.OPEN) return

    ws.current.send(JSON.stringify({
      message: input.trim(),
      type: "text"
    }))
    setInput("")
  }
const fetchHistory = async () => {
  try {
    const res = await fetch(`https://quickchat.fly.dev/api/chats/${chatId}/messages/`, {
      headers: {
        Authorization: `Token ${token.value}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch messages");

    const data = await res.json();
    setMessages(data);  // set initial history
  } catch (err) {
    console.error("❌ Error fetching history:", err);
  }
};
const handleInputChange = (e) => {
  const value = e.target.value
  setInput(value)

  if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return

  ws.current.send(JSON.stringify({ typing: true }))

  clearTimeout(typingTimeout.current)
  typingTimeout.current = setTimeout(() => {
    ws.current.send(JSON.stringify({ typing: false }))
  }, 1500)  // 1.5 seconds of inactivity
}

return (
  <div className="flex flex-col h-full">
    {/* 🟦 Message Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
{messages.map((msg, idx) => {
  const isCurrentUser = msg.sender.id === currentUserId;

  return (
    <div
      key={idx}
      className={`flex items-start gap-2.5 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isCurrentUser && (
        <Image
          src={msg.sender.profile_picture || "/default-avatar.png"}
          width={32}
          height={32}
          alt="Sender image"
          className="rounded-full"
        />
      )}
    {console.log(msg, "IJWifdcj")}
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 rounded-xl ${
          isCurrentUser
            ? 'bg-blue-500 text-white rounded-se-none'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white rounded-ss-none'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold">
            {isCurrentUser ? 'You' : msg.sender.first_name || 'Bonnie Green'}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {new Date(msg.created_at).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5">{msg.content}</p>
        <span className="text-sm font-normal text-gray-400">Delivered</span>
      </div>

      {isCurrentUser && (
        <Image
          src={msg.sender.profile_picture || "/default-avatar.png"}
          width={32}
          height={32}
          alt="Sender image"
          className="rounded-full"
        />
      )}
    </div>
  );
})}
{/* 

    //     <div
    //       key={idx}
    //       className={`p-2 rounded-lg max-w-xs ${
    //         msg.sender.id === currentUserId
    //           ? "bg-blue-500 text-white self-end ml-auto"
    //           : "bg-gray-200 text-black self-start mr-auto"
    //       }`}
    //     >


    // <div className="text-sm"></div>
    //       <div className="text-[10px] text-gray-400 mt-1">
            
    //       </div>
    //     </div> */}




      <div ref={bottomRef} />
    </div>

    {/* 🟨 Typing + Input Bar */}
    <div className="border-t p-2">
      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 mb-1">
          {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
        </div>
      )}

      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 outline-none"
          placeholder="Type a message"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

  
}

export default RealChat
